import Workspace from "./icons/Workspace.jsx";
import Person from "./icons/Person.jsx";
import { useEffect, useState } from "react";
import NotificationCenter from "./notifications/NotificationCenter.jsx";
import PropTypes from "prop-types";
import useFetchUserData from "../hooks/useFetchUserData.jsx";
import Menu from "./Menu.jsx";

Navbar.propTypes = {
    selectedWorkspace: PropTypes.object,
    workspaceColor: PropTypes.string,
}

export default function Navbar({ selectedWorkspace, workspaceColor }) {
    const [greeting, setGreeting] = useState("Bonjour");

    const userData = useFetchUserData();

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour < 6 || currentHour >= 18) {
            setGreeting("Bonsoir");
        } else {
            setGreeting("Bonjour");
        }
    }, []);



    const getAvatarUrl = () => {
        if (!userData?.avatarHash) return null;
        return `https://trello-members.s3.amazonaws.com/${userData.id}/${userData.avatarHash}/170.png`;
    };

    const firstName = userData?.fullName?.split(' ')[0];

    return (
        <>
            <div className="flex h-18 w-full justify-between border-b-2 border-gray-200 dark:border-violet-900 bg-white dark:bg-purple-950 dark:text-white duration-1000 content-center z-10 gap-4">
                <div className={`${Menu.isMenuOpen ? "w-64 flex relative left-50 justify-end items-center font-bold text-black dark:text-gray-300 min-sm:text-xs lg:text-xl gap-4" : "w-64 flex relative left-10 justify-end items-center font-bold text-black dark:text-gray-300 min-sm:text-xs lg:text-xl gap-4"}`} >
                    {selectedWorkspace && (
                        <>
                            <Workspace color={workspaceColor || "#ECB500"}/>
                            {selectedWorkspace.name}
                        </>
                    )}
                </div>
                <div className="w-20 flex items-center relative left-12 lg:left-120 xl:left-250">
                    {userData && <NotificationCenter userId={userData.id} />}
                </div>
                <div className="max-md:invisible max-md:w-0 w-full flex p-2 text-black dark:text-white items-center justify-end">
                    {greeting} {firstName || 'Utilisateur'}
                </div>
                <div className="p-2 px-6 text-black dark:text-white flex items-center text-xl">
                    {userData?.avatarHash ?(
                        <img 
                            src={getAvatarUrl()}
                            alt="Avatar" 
                            className="max-sm:w-12 w-18 object-fill rounded-full transition-all duration-200 relativemd:left-0 left-24"
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