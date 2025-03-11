import { useState, useEffect } from 'react';

export default function NotificationCenter({ userId }) {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (userId) {
            fetchNotifications(userId);
        }
    }, [userId]);

    const fetchNotifications = async (userId) => {
        try {
            const response = await fetch(
                `https://api.trello.com/1/members/${userId}/notifications?key=${import.meta.env.VITE_TRELLO_API_KEY}&token=${import.meta.env.VITE_TRELLO_API_TOKEN}`
            );
            const data = await response.json();
            setNotifications(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des notifications:', error);
        }
    };

    const formatNotificationDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (minutes < 60) return `Il y a ${minutes} minutes`;
        if (hours < 24) return `Il y a ${hours} heures`;
        return `Il y a ${days} jours`;
    };

    const getNotificationContent = (notification) => {
        switch (notification.type) {
            case 'addedToBoard':
                return `${notification.memberCreator.fullName} vous a ajouté au tableau "${notification.data.board.name}"`;
            case 'addedToCard':
                return `${notification.memberCreator.fullName} vous a ajouté à la carte "${notification.data.card.name}"`;
            case 'mentionedOnCard':
                return `${notification.memberCreator.fullName} vous a mentionné dans la carte "${notification.data.card.name}"`;
            case 'changeCard':
                return `${notification.memberCreator.fullName} a modifié la carte "${notification.data.card.name}"`;
            case 'createdCard':
                return `${notification.memberCreator.fullName} a créé une nouvelle carte "${notification.data.card.name}"`;
            case 'movedCard':
                return `${notification.memberCreator.fullName} a déplacé la carte "${notification.data.card.name}"`;
            default:
                return notification.data.text || 'Notification Trello';
        }
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'addedToBoard':
                return (
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                );
            case 'addedToCard':
            case 'mentionedOnCard':
                return (
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                );
            case 'changeCard':
                return (
                    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                );
        }
    };

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full relative"
            >
                <svg className="w-6 h-6 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {notifications.length}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-gray-800 dark:text-white">Notifications</h3>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                            Aucune notification
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {notifications.map((notification) => (
                                <div key={notification.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                            {getNotificationIcon(notification.type)}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-800 dark:text-gray-200">
                                                {getNotificationContent(notification)}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {formatNotificationDate(notification.date)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
} 