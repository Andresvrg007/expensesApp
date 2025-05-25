import { useState, useEffect } from 'react';
import { CheckCircleIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const Alert = ({ type, message, onClose, autoClose = true, duration = 3000 }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (autoClose) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                setTimeout(onClose, 300); // Wait for animation to complete
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [autoClose, duration, onClose]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const getAlertStyles = () => {
        switch (type) {
            case 'success':
                return {
                    container: 'bg-green-50 border-green-200 text-green-800',
                    icon: 'text-green-400',
                    IconComponent: CheckCircleIcon
                };
            case 'error':
                return {
                    container: 'bg-red-50 border-red-200 text-red-800',
                    icon: 'text-red-400',
                    IconComponent: ExclamationTriangleIcon
                };
            case 'warning':
                return {
                    container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
                    icon: 'text-yellow-400',
                    IconComponent: ExclamationTriangleIcon
                };
            default:
                return {
                    container: 'bg-blue-50 border-blue-200 text-blue-800',
                    icon: 'text-blue-400',
                    IconComponent: CheckCircleIcon
                };
        }
    };

    const { container, icon, IconComponent } = getAlertStyles();    return (
        <div className={`fixed top-4 right-4 left-4 sm:left-auto z-40 transition-all duration-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}>
            <div className={`w-full sm:max-w-sm ${container} border rounded-lg shadow-lg p-3`}><div className="flex">
                    <div className="flex-shrink-0">
                        <IconComponent className={`h-4 w-4 ${icon}`} />
                    </div>
                    <div className="ml-2 flex-1">
                        <p className="text-xs font-medium">{message}</p>
                    </div>
                    <div className="ml-3 flex-shrink-0 flex">
                        <button
                            className={`rounded-md inline-flex ${icon} hover:opacity-75 focus:outline-none focus:ring-1 focus:ring-offset-1`}
                            onClick={handleClose}
                        >
                            <span className="sr-only">Close</span>
                            <XMarkIcon className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
