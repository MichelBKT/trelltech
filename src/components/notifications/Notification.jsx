import { useEffect } from 'react';

export default function Notification({ message, type = 'error', onClose, duration = 5000 }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return (
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                );
            case 'error':
                return (
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                );
            default:
                return null;
        }
    };

    const getBackgroundColor = () => {
        switch (type) {
            case 'success':
                return 'bg-green-100 dark:bg-green-900/40';
            case 'error':
                return 'bg-red-100 dark:bg-red-900/40';
            default:
                return 'bg-gray-100 dark:bg-gray-900/40';
        }
    };

    return (
        <div className={`fixed top-4 right-4 z-50 animate-slide-in ${getBackgroundColor()} rounded-lg shadow-lg p-4 flex items-center gap-3 backdrop-blur-sm`}>
            {getIcon()}
            <p className="text-sm font-medium text-gray-900 dark:text-white">{message}</p>
            <button
                onClick={onClose}
                className="ml-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
} 