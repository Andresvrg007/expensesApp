import Transaction from '../models/Transaction.js';
import User from '../models/User.js';

// Función para obtener todas las transacciones del usuario / Function to get all user transactions
export const getTransactions = async (req, res) => {
  // (Aquí irá la lógica para obtener las transacciones)
};

// Función para agregar una nueva transacción / Function to add a new transaction
export const addTransaction = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const jwt = await import('jsonwebtoken');
    const decoded = jwt.default.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const { amount, description, category, type } = req.body;
    if (!amount || !description || !category || !type) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ error: 'Amount must be a positive number' });
    }
    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ error: 'Invalid transaction type' });
    }

    // Map type to DB values
    const dbType = type === 'income' ? 'ingreso' : 'gasto';

    // Create transaction
    const transaction = new Transaction({
      userId,
      tipo: dbType,
      categoria: category,
      monto: amount,
      fecha: new Date(),
      descripcion: description
    });
    await transaction.save();

    // Update user balance
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (type === 'income') {
      user.balance += Number(amount);
    } else {
      user.balance -= Number(amount);
    }
    await user.save();

    res.status(201).json({ message: 'Transaction added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding transaction' });
  }
};