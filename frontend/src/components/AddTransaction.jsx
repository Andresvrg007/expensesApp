import { useState, useEffect } from "react";
// Puedes instalar Heroicons con: npm install @heroicons/react
import { ArrowDownCircleIcon, ArrowUpCircleIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const expenseCategories = ["Food", "Transport", "Entertainment", "Health", "Other"];
const incomeCategories = ["Salary", "Freelance", "Gift", "Other"];

export const AddTransaction = () => {
    const [type, setType] = useState("expense");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [salary, setSalary] = useState("");
    const [salarySaved, setSalarySaved] = useState(false);
    const [salaryMessage, setSalaryMessage] = useState("");
    const [transactionMessage, setTransactionMessage] = useState("");
    const [transactionLoading, setTransactionLoading] = useState(false);

    useEffect(() => {
        const fetchSalary = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/profile', {
                    method: 'GET',
                    credentials: 'include',
                });
                const res = await response.json();
                if (response.ok && res.salary && Number(res.salary) > 0) {
                    setSalary(res.salary);
                    setSalarySaved(true);
                } else {
                    setSalarySaved(false);
                }
            } catch (error) {
                // Opcional: puedes mostrar un mensaje de error si lo deseas
            }
        };
        fetchSalary();
    }, []);

    const handleSaveSalary = async () => {
        if (!salary || Number(salary) <= 0) {
            setSalaryMessage("Invalid salary");
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/api/salary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sueldo: salary }),
                credentials: 'include',
            });
            const res = await response.json();
            if (!response.ok) {
                setSalaryMessage(res.error || "Error saving salary");
                return;
            }
            setSalaryMessage("Salary saved successfully!");
            setSalarySaved(true);
            setTimeout(() => {
                setSalaryMessage("");
            }, 3000);
        } catch (error) {
            setSalaryMessage("Server connection error. Please check console and backend.");
        }
    };

    const handleAddTransaction = async () => {
        setTransactionMessage("");
        // Validación frontend
        if (!amount || !description || !category || !type) {
            setTransactionMessage("All fields are required");
            return;
        }
        if (isNaN(amount) || Number(amount) <= 0) {
            setTransactionMessage("Amount must be a positive number");
            return;
        }
        setTransactionLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/transaction', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    amount: Number(amount),
                    description,
                    category,
                    type
                })
            });
            const res = await response.json();
            if (!response.ok) {
                setTransactionMessage(res.error || "Error adding transaction");
                setTransactionLoading(false);
                return;
            }
            setTransactionMessage(res.message || "Transaction added successfully!");
            setAmount("");
            setDescription("");
            setCategory("");
            setTransactionLoading(false);
            setTimeout(() => {
                setTransactionMessage("");
            }, 3000);
        } catch (error) {
            setTransactionMessage("Server connection error. Please check console and backend.");
            setTransactionLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-2xl p-8 mt-10 space-y-6 font-sans">
            
            {salaryMessage && (
                <div
                    className={`w-full p-4 rounded-md text-center text-sm font-medium mb-6 ${
                        salaryMessage === 'Salary saved successfully!'
                            ? 'bg-green-100 text-green-700 border border-green-300'
                            : 'bg-red-100 text-red-700 border border-red-300'
                    }`}
                    role="alert"
                >
                    {salaryMessage}
                </div>
            )}

            {/* Salary Section */}
            <div className="space-y-2">
                <label htmlFor="salary" className="text-sm font-medium text-gray-700">Monthly Salary</label>
                <div className="flex items-center gap-3">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="salary"
                            type="number"
                            placeholder="Enter your salary"
                            className="w-full py-2.5 pl-10 pr-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-200 disabled:cursor-not-allowed"
                            value={salary}
                            onChange={e => setSalary(e.target.value)}
                            disabled={salarySaved}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleSaveSalary}
                        disabled={salarySaved}
                        className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 
                            ${salarySaved 
                                ? 'bg-indigo-300 text-white cursor-not-allowed' 
                                : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'}`}
                    >
                        Save Salary
                    </button>
                </div>
            </div>

            {/* Transaction Type (Expense/Income) */}
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

            {/* Form Fields */}
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
                    </select>
                </div>
            </div>

            {/* Mensaje de transacción */}
            {transactionMessage && (
                <div
                    className={`w-full p-4 rounded-md text-center text-sm font-medium mb-6 ${
                        transactionMessage.includes('successfully')
                            ? 'bg-green-100 text-green-700 border border-green-300'
                            : 'bg-red-100 text-red-700 border border-red-300'
                    }`}
                    role="alert"
                >
                    {transactionMessage}
                </div>
            )}

            {/* Submit Button */}
            <button
                type="button"
                onClick={handleAddTransaction}
                disabled={transactionLoading}
                className="w-full py-3 px-5 text-base font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-150"
            >
                {transactionLoading ? 'Adding...' : 'Add Transaction'}
            </button>
        </div>
    );
};

export default AddTransaction; 