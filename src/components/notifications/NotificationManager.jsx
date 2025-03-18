import { useState, forwardRef, useImperativeHandle } from 'react';
import Notification from './Notification';


const NotificationManager = forwardRef(function NotificationManager(props, ref) {
const [notifications, setNotifications] = useState([]);

    const addNotification = (message, type = 'error') => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type }]);
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    };

    useImperativeHandle(ref, () => ({
        addNotification
    }));

    return (
        <div className="fixed top-0 right-0 z-50 space-y-2 p-4">
            {notifications.map(notification => (
                <Notification
                    key={notification.id}
                    message={notification.message}
                    type={notification.type}
                    onClose={() => removeNotification(notification.id)}
                />
            ))}
        </div>
    );
});

// Créer une instance unique du gestionnaire de notifications
let notificationManagerInstance = null;

export const showNotification = (message, type = 'error') => {
    if (!notificationManagerInstance) {
        console.error('NotificationManager n\'est pas initialisé');
        return;
    }
    notificationManagerInstance.addNotification(message, type);
};

export const setNotificationManager = (instance) => {
    notificationManagerInstance = instance;
};

export default NotificationManager; 