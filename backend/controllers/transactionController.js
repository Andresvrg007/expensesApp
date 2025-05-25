import Transaction from '../models/Transaction.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// Función para agregar una nueva transacción / Function to add a new transaction
export const addTransaction = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
        const dbType = type === 'income' ? 'ingreso' : 'gasto';        // Create transaction
        const transaction = new Transaction({
            userId,
            tipo: dbType,
            category: category,
            amount: amount,
            fecha: new Date(),
            description: description
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
            user.balance -= Number(amount);        }
        await user.save();

        res.status(201).json({ message: 'Transaction added successfully' });
    } catch (error) {
        console.error('Error adding transaction:', error);
        res.status(500).json({ error: 'Error adding transaction' });
    }
};

// Función para obtener resumen de transacciones
export const getTransactionsSummary = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'Not authenticated' });
        }        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Verificar y resetear automáticamente si es necesario
        await checkAndResetIfEndOfMonth(userId);

        const summary = await Transaction.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: { type: "$tipo", category: "$category" },
                    total: { $sum: "$amount" }
                }
            },
            {
                $project: {
                    type: "$_id.type",
                    category: "$_id.category",
                    total: 1,
                    _id: 0
                }
            }
        ]);

        const income = summary.filter(item => item.type === "ingreso");
        const expenses = summary.filter(item => item.type === "gasto");

        res.json({ income, expenses });
    } catch (error) {        console.error('Error getting transactions summary:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Función para resetear transacciones al final del mes
export const resetMonthlyTransactions = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Eliminar todas las transacciones del usuario
        await Transaction.deleteMany({ userId: new mongoose.Types.ObjectId(userId) });

        // Resetear el balance del usuario a 0
        await User.findByIdAndUpdate(userId, { balance: 0 });

        res.json({ message: 'Monthly transactions reset successfully' });
    } catch (error) {
        console.error('Error resetting monthly transactions:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Función para verificar y resetear automáticamente si es fin de mes
export const checkAndResetIfEndOfMonth = async (userId) => {
    try {
        const now = new Date();
        const lastResetKey = `lastReset_${userId}`;
        
        // Verificar si ya se reseteó este mes
        const user = await User.findById(userId);
        if (!user.lastMonthlyReset) {
            user.lastMonthlyReset = new Date(now.getFullYear(), now.getMonth(), 1);
            await user.save();
        }

        const lastReset = new Date(user.lastMonthlyReset);
        const currentMonth = now.getMonth();
        const lastResetMonth = lastReset.getMonth();

        // Si estamos en un mes diferente al último reset, resetear
        if (currentMonth !== lastResetMonth) {
            await Transaction.deleteMany({ userId: new mongoose.Types.ObjectId(userId) });
            
            // Actualizar la fecha del último reset
            user.lastMonthlyReset = new Date(now.getFullYear(), now.getMonth(), 1);
            user.balance = 0;
            await user.save();
            
            console.log(`Monthly reset performed for user ${userId}`);
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('Error in automatic monthly reset:', error);
        return false;
    }
};