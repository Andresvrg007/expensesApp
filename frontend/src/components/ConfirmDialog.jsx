import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel", type = "warning" }) => {
    if (!isOpen) return null;

    const getTypeStyles = () => {
        switch (type) {
            case 'danger':
                return {
                    icon: 'text-red-600',
                    confirmButton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                };
            case 'warning':
                return {
                    icon: 'text-yellow-600',
                    confirmButton: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
                };
            default:
                return {
                    icon: 'text-gray-600',
                    confirmButton: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                };
        }
    };

    const { icon, confirmButton } = getTypeStyles();    return (
        <div className="fixed top-20 right-4 left-4 sm:left-auto sm:right-6 z-50">
            {/* Modal panel - Compact size */}
            <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full sm:w-80 animate-in slide-in-from-right duration-300">                <div className="p-4 sm:p-4">
                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-red-100">
                                <ExclamationTriangleIcon className={`h-5 w-5 ${icon}`} />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-base font-medium text-gray-900 mb-1">
                                {title}
                            </h3>
                            <p className="text-xs sm:text-xs text-gray-600 leading-relaxed">
                                {message}
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 rounded-b-lg flex flex-col-reverse sm:flex-row sm:justify-end space-y-2 space-y-reverse sm:space-y-0 sm:space-x-2">
                    <button
                        type="button"
                        className="w-full sm:w-auto px-3 py-2 sm:py-1.5 border border-gray-300 rounded-md text-sm sm:text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500 transition-all duration-150"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        className={`w-full sm:w-auto px-3 py-2 sm:py-1.5 ${confirmButton} text-white rounded-md text-sm sm:text-xs font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all duration-150`}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};
