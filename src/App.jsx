import './App.css';
import Menu from "./components/Menu.jsx";
import Navbar from "./components/Navbar.jsx";
import MainApp from "./components/MainApp.jsx";
import { useEffect, useRef, useState } from 'react';
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
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);
    const [workspaceColor, setWorkspaceColor] = useState(null);

    useEffect(() => {
        if (notificationManagerRef.current) {
            setNotificationManager(notificationManagerRef.current);
            console.log('NotificationManager initialisé avec succès');
        }
    }, []);

    const handleWorkspaceSelect = (workspace, color) => {
        setSelectedWorkspace(workspace);
        setWorkspaceColor(color);
    };

    return (
        <>
            <div className="relative h-screen">
                <Menu className="z-50" onWorkspaceSelect={handleWorkspaceSelect} />
                <div className="flex flex-col h-full">
                    <Navbar className="z-10" selectedWorkspace={selectedWorkspace} workspaceColor={workspaceColor} />
                    <MainApp />
                </div>
                <NotificationManager ref={notificationManagerRef} />
            </div>
        </>
    );
}

//export {env};
