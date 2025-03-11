import Workspace from "./icons/Workspace.jsx";
import Person from "./icons/Person.jsx";
import { useEffect, useState } from "react";
import NotificationCenter from "./notifications/NotificationCenter.jsx";

export default function Navbar({ selectedWorkspace, workspaceColor }) {
    const [greeting, setGreeting] = useState("Bonjour");
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour < 6 || currentHour >= 18) {
            setGreeting("Bonsoir");
        } else {
            setGreeting("Bonjour");
        }
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://api.trello.com/1/members/me?key=${import.meta.env.VITE_TRELLO_API_KEY}&token=${import.meta.env.VITE_TRELLO_API_TOKEN}`);
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données utilisateur:', error);
            }
        };

        fetchUserData();
    }, []);

    const getAvatarUrl = () => {
        if (!userData?.avatarHash) return null;
        return `https://trello-members.s3.amazonaws.com/${userData.id}/${userData.avatarHash}/170.png`;
    };

    return (
        <>
            <div className="flex h-18 w-full bg-white dark:bg-gray-900 duration-1000 content-center border-b-2 border-gray-200 dark:border-gray-700 z-10 gap-4">
                <div className="w-full max-md:w-0 md:ml-32 lg:justify-center justify-end flex relative items-center font-bold text-black dark:text-gray-300 min-sm:text-xs lg:text-xl gap-0 md:gap-4">
                    {selectedWorkspace && (
                        <>
                            <Workspace color={workspaceColor || "#ECB500"}/>
                            {selectedWorkspace.name}
                        </>
                    )}
                </div>
                <div className="w-full max-md:ml-2 flex items-center justify-end relative">
                    {userData && <NotificationCenter userId={userData.id} />}
                </div>
                <div className="max-md:invisible max-md:w-0 w-72 flex p-2 text-black dark:text-gray-300 items-center justify-end">
                    {greeting} {userData?.fullName || 'Utilisateur'}
                </div>
                <div className="p-2 px-6 text-black dark:text-gray-500 flex items-center text-xl">
                    {userData?.avatarHash ? (
                        <img 
                            src={getAvatarUrl()}
                            alt="Avatar" 
                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover transition-all duration-200"
                            onError={(e) => {
                                console.error('Erreur de chargement de l\'avatar');
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = '<svg class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>';
                            }}
                        />
                    ) : (
                        <Person className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                    )}
                </div>
            </div>
        </>
    );
}