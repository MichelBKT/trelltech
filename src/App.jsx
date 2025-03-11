import './App.css';
import Menu from "./components/Menu.jsx";
import Navbar from "./components/Navbar.jsx";
import MainApp from "./components/MainApp.jsx";
import { useEffect, useRef } from 'react';
import { setNotificationManager } from './components/notifications/NotificationManager';
import NotificationManager from './components/notifications/NotificationManager';

//
// const env = {
//     apiUrl: import.meta.env.TRELLO_API_URL,
//     apiKey: import.meta.env.TRELLO_API_KEY,
//     apiToken: import.meta.env.TRELLO_API_TOKEN,
// };

export default function App() {
    const notificationManagerRef = useRef(null);

    useEffect(() => {
        if (notificationManagerRef.current) {
            setNotificationManager(notificationManagerRef.current);
            console.log('NotificationManager initialisé avec succès');
        }
    }, []);

    return (
        <>
            <div className="relative h-screen">
                <Menu className="z-50" />
                <div className="flex flex-col h-full">
                    <Navbar className="z-10"/>
                    <MainApp />
                </div>
                <NotificationManager ref={notificationManagerRef} />
            </div>
        </>
    );
}

//export {env};
