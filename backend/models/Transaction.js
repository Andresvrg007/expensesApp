// models/Transaction.js
import mongoose from 'mongoose';

// Transaction schema: stores each income or expense
// Esquema de transacción: almacena cada ingreso o gasto
const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',           // Reference to User / Referencia al usuario
    required: true
  },
  tipo: {
    type: String,
    enum: ['ingreso', 'gasto'], // Only "ingreso" or "gasto" / Solo puede ser ingreso o gasto
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  monto: {
    type: Number,
    required: true
  },
  moneda: {
    type: String,
    default: 'DO'
  },
  fecha: {
    type: Date,
    required: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  etiquetas: [{
    type: String,
    trim: true
  }],
  metodoPago: {
    type: String,
    enum: ['efectivo', 'tarjeta', 'transferencia'],
    default: 'efectivo'
  }
}, {
  timestamps: true // Adds createdAt and updatedAt / Agrega createdAt y updatedAt
});

// Export the model / Exporta el modelo
const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;