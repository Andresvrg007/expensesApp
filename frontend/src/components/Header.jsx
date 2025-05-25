import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserCircleIcon, ArrowRightOnRectangleIcon, CalendarDaysIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Alert } from './Alert';
import { ConfirmDialog } from './ConfirmDialog';
import { API_ENDPOINTS } from '../config/api';

export const Header = ({ onReset }) => {
    const { user, logout } = useAuth();
    const [alert, setAlert] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Función para obtener el último día del mes actual
    const getEndOfMonth = () => {
        const now = new Date();
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return lastDay.getDate();
    };

    // Función para obtener días restantes hasta fin de mes
    const getDaysUntilReset = () => {
        const now = new Date();
        const endOfMonth = getEndOfMonth();
        const currentDay = now.getDate();
        return endOfMonth - currentDay;
    };

    // Función para obtener el nombre del mes actual
    const getCurrentMonth = () => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[new Date().getMonth()];
    };    // Función para resetear manualmente
    const handleManualReset = async () => {
        setShowConfirmDialog(false);
        
        try {
            const response = await fetch(API_ENDPOINTS.RESET_MONTHLY, {
                method: "POST",
                credentials: "include"
            });
            
            if (response.ok) {
                setAlert({
                    type: 'success',
                    message: 'Transactions reset successfully!'
                });
                // Call the callback to refresh data instead of page reload
                if (onReset) {
                    onReset();
                }
            } else {
                setAlert({
                    type: 'error',
                    message: 'Error resetting transactions. Please try again.'
                });
            }
        } catch (error) {
            console.error('Error:', error);
            setAlert({
                type: 'error',
                message: 'Connection error. Please check your internet connection.'
            });
        }
    };

    const handleResetClick = () => {
        setShowConfirmDialog(true);
    };

    const daysUntilReset = getDaysUntilReset();
    const endOfMonth = getEndOfMonth();
    const currentMonth = getCurrentMonth();    return (
        <>
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
            
            <ConfirmDialog
                isOpen={showConfirmDialog}
                title="Reset All Transactions"
                message="Are you sure you want to reset all transactions? This action cannot be undone and will permanently delete all your income and expense records."
                onConfirm={handleManualReset}
                onCancel={() => setShowConfirmDialog(false)}
                confirmText="Reset"
                cancelText="Cancel"
                type="danger"
            />
              <header className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6">
                    {/* Desktop and Mobile Header */}
                    <div className="flex justify-between items-center h-16">
                        {/* Logo y título */}
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg">
                                <span className="text-white font-bold text-lg">$</span>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-xl font-bold text-gray-900">ExpenseTracker</h1>
                                <p className="text-sm text-gray-500">Manage your finances</p>
                            </div>
                            <div className="sm:hidden">
                                <h1 className="text-lg font-bold text-gray-900">ExpenseTracker</h1>
                            </div>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-4">
                            {/* Info de reset mensual */}
                            <div className="flex items-center space-x-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 cursor-pointer hover:bg-amber-100 transition-colors" onClick={handleResetClick} title="Click to reset manually">
                                <CalendarDaysIcon className="w-5 h-5 text-amber-600" />
                                <div className="text-right">
                                    <p className="text-sm font-medium text-amber-800">
                                        Reset: {currentMonth} {endOfMonth}
                                    </p>
                                    <p className="text-xs text-amber-600">
                                        {daysUntilReset === 0 ? 'Today!' : `${daysUntilReset} days left`}
                                    </p>
                                </div>
                            </div>

                            {/* Info del usuario */}
                            <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-3 py-2">
                                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                                    <UserCircleIcon className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                                    <p className="text-xs text-gray-500">User</p>
                                </div>
                            </div>

                            {/* Botón de logout */}
                            <button
                                onClick={logout}
                                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {isMobileMenuOpen ? (
                                    <XMarkIcon className="w-6 h-6 text-gray-600" />
                                ) : (
                                    <Bars3Icon className="w-6 h-6 text-gray-600" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden border-t border-gray-200 bg-white">
                            <div className="px-2 py-3 space-y-3">
                                {/* User Info Mobile */}
                                <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-3 py-3">
                                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                                        <UserCircleIcon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-base font-medium text-gray-900">{user?.username}</p>
                                        <p className="text-sm text-gray-500">User</p>
                                    </div>
                                </div>

                                {/* Reset Info Mobile */}
                                <div 
                                    className="flex items-center space-x-3 bg-amber-50 border border-amber-200 rounded-lg px-3 py-3 cursor-pointer hover:bg-amber-100 transition-colors" 
                                    onClick={() => {
                                        handleResetClick();
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    <CalendarDaysIcon className="w-6 h-6 text-amber-600" />
                                    <div>
                                        <p className="text-base font-medium text-amber-800">
                                            Reset: {currentMonth} {endOfMonth}
                                        </p>
                                        <p className="text-sm text-amber-600">
                                            {daysUntilReset === 0 ? 'Today!' : `${daysUntilReset} days left`}
                                        </p>
                                    </div>
                                </div>

                                {/* Logout Button Mobile */}
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white text-base font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
}; 