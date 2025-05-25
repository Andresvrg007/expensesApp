import { useState, useEffect, useCallback } from "react";
import { Header } from "../components/Header";
import { AddTransaction } from "../components/AddTransaction";
import { ExpensesPieChart } from "../components/ExpensesPieChart";
import { ArrowUpIcon, ArrowDownIcon, ScaleIcon } from '@heroicons/react/24/solid';
import { API_ENDPOINTS } from '../config/api';

export const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });    const fetchTransactions = useCallback(() => {
        fetch(API_ENDPOINTS.TRANSACTIONS_SUMMARY, { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                if (data.income && data.expenses) {
                    const totalIncome = data.income.reduce((acc, curr) => acc + curr.total, 0);
                    const totalExpenses = data.expenses.reduce((acc, curr) => acc + curr.total, 0);

                    const combinedTransactions = [...data.income, ...data.expenses];
                    
                    setTransactions(combinedTransactions);
                    setSummary({
                        income: totalIncome,
                        expense: totalExpenses,
                        balance: totalIncome - totalExpenses,
                    });
                } else {
                    setTransactions([]);
                    setSummary({ income: 0, expense: 0, balance: 0 });
                }
            })
            .catch(err => {
                console.error("Error fetching transactions:", err);
                setTransactions([]);
                setSummary({ income: 0, expense: 0, balance: 0 });
            });
    }, []);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    const handleTransactionAdded = () => {
        fetchTransactions();
    };    return (
        <div className="h-screen bg-gray-100 flex flex-col">
            <Header onReset={fetchTransactions} />
            <main className="flex-1 max-w-[1400px] mx-auto w-full py-4 px-2 sm:px-4 lg:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
                    {/* Columna izquierda - Formulario */}
                    <div className="flex flex-col">
                        <div className="bg-white shadow-lg rounded-xl p-4 lg:p-5 h-full flex flex-col">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Add Transaction
                            </h2>
                            <div className="flex-1 overflow-auto">
                                <AddTransaction onTransactionAdded={handleTransactionAdded} />
                            </div>
                        </div>
                    </div>

                    {/* Columna derecha - Gráfico y resumen */}
                    <div className="flex flex-col">
                        <div className="bg-white shadow-lg rounded-xl p-4 lg:p-5 h-full flex flex-col">                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Financial Summary</h2>
                            <div className="flex-1 flex flex-col">
                                {transactions.length > 0 ? (
                                    <div className="flex-1">
                                        <ExpensesPieChart data={transactions} />
                                    </div>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center">
                                        <p className="text-center text-gray-500">No data available to display the chart.</p>
                                    </div>
                                )}                                <div className="mt-6 flex-shrink-0">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {/* Income Card */}
                                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 transition-all duration-200 hover:shadow-md">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-green-600 mb-1">Income</p>
                                                    <p className="text-2xl font-bold text-green-700">${summary.income}</p>
                                                </div>
                                                <div className="p-2 bg-green-100 rounded-full">
                                                    <ArrowUpIcon className="w-6 h-6 text-green-600" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Expenses Card */}
                                        <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4 transition-all duration-200 hover:shadow-md">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-red-600 mb-1">Expenses</p>
                                                    <p className="text-2xl font-bold text-red-700">${summary.expense}</p>
                                                </div>
                                                <div className="p-2 bg-red-100 rounded-full">
                                                    <ArrowDownIcon className="w-6 h-6 text-red-600" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Balance Card */}
                                        <div className={`bg-gradient-to-r ${summary.balance >= 0 
                                            ? 'from-blue-50 to-indigo-50 border-blue-200' 
                                            : 'from-orange-50 to-amber-50 border-orange-200'
                                        } border rounded-lg p-4 transition-all duration-200 hover:shadow-md`}>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className={`text-sm font-medium mb-1 ${summary.balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                                                        Balance
                                                    </p>
                                                    <p className={`text-2xl font-bold ${summary.balance >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>
                                                        ${summary.balance}
                                                    </p>
                                                </div>
                                                <div className={`p-2 rounded-full ${summary.balance >= 0 ? 'bg-blue-100' : 'bg-orange-100'}`}>
                                                    <ScaleIcon className={`w-6 h-6 ${summary.balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};


