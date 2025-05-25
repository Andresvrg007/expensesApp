import { useState } from "react";
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import { Alert } from './Alert';
import { API_ENDPOINTS } from '../config/api';

const expenseCategories = ["Food", "Transport", "Entertainment", "Health", "Other"];
const incomeCategories = ["Salary", "Freelance", "Gift", "Other"];

export const AddTransaction = ({ onTransactionAdded }) => {
    const [type, setType] = useState("expense");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");    const [description, setDescription] = useState("");
    const [transactionLoading, setTransactionLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleAddTransaction = async (e) => {
        e.preventDefault();        if (!amount || !description || !category || !type) {
            setAlert({
                type: 'error',
                message: 'Please fill in all fields.'
            });
            return;
        }

        if (isNaN(amount) || Number(amount) <= 0) {
            setAlert({
                type: 'error',
                message: 'Amount must be a positive number.'
            });
            return;
        }

        setTransactionLoading(true);
        setAlert(null);

        const transaction = {
            amount,
            description,
            category,
            type
        };        try {
            const response = await fetch(API_ENDPOINTS.TRANSACTION, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(transaction),
            });            if (response.ok) {
                setAmount("");
                setDescription("");
                setCategory("");
                setType("expense");
                setAlert({
                    type: 'success',
                    message: 'Transaction added successfully!'
                });
                onTransactionAdded(); // Llamar sin parámetros para que fetchTransactions se ejecute
            } else {
                setAlert({
                    type: 'error',
                    message: 'Failed to add transaction. Please try again.'
                });
                console.error("Error adding transaction");
            }
        } catch (error) {
            setAlert({
                type: 'error',
                message: 'An error occurred while adding the transaction.'
            });
            console.error("Error:", error);
        } finally {
            setTransactionLoading(false);
        }
    };    return (
        <>
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
            
            <form onSubmit={handleAddTransaction} className="w-full space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <button
                    type="button"
                    onClick={() => setType("expense")}
                    className={`flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 
                        ${type === "expense"
                            ? 'bg-red-500 text-white shadow-md scale-105 focus:ring-red-400'
                            : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-500 focus:ring-red-400'}`}
                >
                    <ArrowDownCircleIcon className="h-5 w-5" /> Expense
                </button>
                <button
                    type="button"
                    onClick={() => setType("income")}
                    className={`flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 
                        ${type === "income"
                            ? 'bg-green-500 text-white shadow-md scale-105 focus:ring-green-400'
                            : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-500 focus:ring-green-400'}`}
                >
                    <ArrowUpCircleIcon className="h-5 w-5" /> Income
                </button>
            </div>

            <div className="space-y-4">
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        className="w-full py-2.5 px-4 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input
                        id="description"
                        type="text"
                        placeholder="e.g., Coffee with friends"
                        className="w-full py-2.5 px-4 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                        id="category"
                        className="w-full py-2.5 px-4 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        {(type === "expense" ? expenseCategories : incomeCategories).map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={transactionLoading}
                className="w-full py-3 px-5 text-base font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-150"
            >
                {transactionLoading ? 'Adding...' : 'Add Transaction'}
            </button>
        </form>
        </>
    );
};

export default AddTransaction;