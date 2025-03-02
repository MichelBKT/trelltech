import ToggleMenu from "./icons/ToggleMenu.jsx";
import BrandWhiteIcon from "./icons/BrandWhiteIcon.jsx";
import Home from "./icons/Home.jsx";
import Suitcase from "./icons/Suitcase.jsx";
import Workspace from "./icons/Workspace.jsx";
import Members from "./icons/Members.jsx";
import Person from "./icons/Person.jsx";
import ToggleOnDarkMode from "./icons/ToggleOnDarkMode.jsx";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import ToggleOffDarkMode from "./icons/ToggleOffDarkMode.jsx";
import Navbar from "./Navbar.jsx";

export default function Menu() {
    const [darkMode, setDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(true);


    useEffect(() => {
        if (Cookies.get('dark') === 'true') {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        }
    }, []);

    useEffect(() => {
        const menu = document.querySelector('aside');
        if (isMenuOpen) {
            menu.classList.add('w-64');
            menu.classList.remove('w-20');
            setIsMenuOpen(true);
        } else {
            menu.classList.add('w-20');
            menu.classList.remove('w-64');
            setIsMenuOpen(false);
        }
    }, [isMenuOpen]);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        if (newDarkMode) {
            document.documentElement.classList.add('dark');
            Cookies.set('dark', 'true', { expires: 365 });
        } else {
            document.documentElement.classList.remove('dark');
            Cookies.set('dark', 'false', { expires: 365 });
        }
    };

    return (
        <>
            <aside className="flex flex-col w-20 duration-1000 h-screen py-2 space-y-2 bg-white dark:bg-gray-900 border-r-2 border-gray-200 dark:border-gray-800">
                <button type="button" className={`${isMenuOpen ? "justify-end p-2" : "p-2"} flex text-gray-500 focus:outline-none cursor-pointer transition-colors duration-1000 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100 gap-y-8`} onClick={() => {setIsMenuOpen(!isMenuOpen);}}>
                    <ToggleMenu/>
                </button>

                <a href="#" className={`${isMenuOpen ? "font-extrabold text-4xl bg-gradient-to-b  from-blue-400 to-purple-500 bg-clip-text text-transparent" : "p-2 flex-row text-gray-500 focus:outline-none transition-colors duration-1000 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100 gap-y-8"} flex flex-row p-2`} >
                    <BrandWhiteIcon />
                    {`${isMenuOpen ? "AGILIX" : ""}`}
                </a>

                <a href="#" className="p-4 pl-6  text-gray-900 font-bold flex flex-row content-center focus:outline-none transition-colors duration-1000 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100">
                    <Home/>
                    <span className="pl-2">
                        {`${isMenuOpen ? "Accueil" : ""}`}
                    </span>
                </a>

                <a href="#" className="p-4 pb-2 pl-5 text-gray-900 font-bold flex flex-row content-center focus:outline-none transition-colors duration-1000 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100">
                    <Suitcase />
                    <span className="pl-2">
                        {`${isMenuOpen ? "Espaces de travail" : ""}`}
                    </span>

                </a>

                <a href="#" className={`${isMenuOpen ? "pl-12" : "pl-6"} pb-2 pt-2 text-gray-900  font-bold flex flex-row content-center focus:outline-none transition-colors duration-1000 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100`}>
                    <Workspace color={"#ECB500"}/>
                    <span className={`${isMenuOpen ? "w-48 pl-2 flex flex-row justify-between" : "hidden"}`}>
                        {`${isMenuOpen ? "Espace 1" : ""}`}
                    </span>
                    <div className={!isMenuOpen ? "hidden" : ""}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" stroke="currentColor">
                            <path d="M10.5 6C10.5 5.79 10.5 5.6865 10.512 5.5995C10.5502 5.32456 10.677 5.0696 10.8733 4.87332C11.0696 4.67704 11.3246 4.55018 11.5995 4.512C11.685 4.5 11.79 4.5 12 4.5C12.21 4.5 12.3135 4.5 12.4005 4.512C12.6754 4.55018 12.9304 4.67704 13.1267 4.87332C13.323 5.0696 13.4498 5.32456 13.488 5.5995C13.5 5.685 13.5 5.79 13.5 6C13.5 6.21 13.5 6.3135 13.488 6.4005C13.4498 6.67544 13.323 6.9304 13.1267 7.12668C12.9304 7.32296 12.6754 7.44982 12.4005 7.488C12.315 7.5 12.21 7.5 12 7.5C11.79 7.5 11.6865 7.5 11.5995 7.488C11.3246 7.44982 11.0696 7.32296 10.8733 7.12668C10.677 6.9304 10.5502 6.67544 10.512 6.4005C10.5 6.315 10.5 6.21 10.5 6ZM10.5 12C10.5 11.79 10.5 11.6865 10.512 11.5995C10.5502 11.3246 10.677 11.0696 10.8733 10.8733C11.0696 10.677 11.3246 10.5502 11.5995 10.512C11.685 10.5 11.79 10.5 12 10.5C12.21 10.5 12.3135 10.5 12.4005 10.512C12.6754 10.5502 12.9304 10.677 13.1267 10.8733C13.323 11.0696 13.4498 11.3246 13.488 11.5995C13.5 11.685 13.5 11.79 13.5 12C13.5 12.21 13.5 12.3135 13.488 12.4005C13.4498 12.6754 13.323 12.9304 13.1267 13.1267C12.9304 13.323 12.6754 13.4498 12.4005 13.488C12.315 13.5 12.21 13.5 12 13.5C11.79 13.5 11.6865 13.5 11.5995 13.488C11.3246 13.4498 11.0696 13.323 10.8733 13.1267C10.677 12.9304 10.5502 12.6754 10.512 12.4005C10.5 12.315 10.5 12.21 10.5 12ZM10.5 18C10.5 17.7915 10.5 17.6865 10.512 17.5995C10.5504 17.3251 10.6772 17.0706 10.8731 16.8746C11.0691 16.6787 11.3236 16.5519 11.598 16.5135C11.6865 16.5015 11.79 16.5015 11.9985 16.5015C12.207 16.5015 12.3135 16.5015 12.399 16.5135C12.6734 16.5519 12.9279 16.6787 13.1239 16.8746C13.3198 17.0706 13.4466 17.3251 13.485 17.5995C13.497 17.6865 13.497 17.7915 13.497 18C13.497 18.2085 13.497 18.3135 13.485 18.4005C13.4466 18.6749 13.3198 18.9294 13.1239 19.1254C12.9279 19.3213 12.6734 19.4481 12.399 19.4865C12.312 19.4985 12.207 19.4985 11.9985 19.4985C11.79 19.4985 11.685 19.4985 11.598 19.4865C11.3236 19.4481 11.0691 19.3213 10.8731 19.1254C10.6772 18.9294 10.5504 18.6749 10.512 18.4005C10.5 18.3135 10.5 18.2085 10.5 18Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1"/>
                        </svg>
                    </div>
                </a>

                <a href="#" className={`${isMenuOpen ? "pl-12" : "pl-6"} pb-2 pt-2 text-gray-900  font-bold flex flex-row content-center focus:outline-none transition-colors duration-1000 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100`}>
                    <Workspace color={"#23C000"}/>
                    <span className={`${isMenuOpen ? "w-48 pl-2 flex flex-row justify-between" : "hidden"}`}>
                        {`${isMenuOpen ? "Espace 2" : ""}`}
                    </span>
                    <div className={!isMenuOpen ? "hidden" : ""}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" stroke="currentColor">
                            <path d="M10.5 6C10.5 5.79 10.5 5.6865 10.512 5.5995C10.5502 5.32456 10.677 5.0696 10.8733 4.87332C11.0696 4.67704 11.3246 4.55018 11.5995 4.512C11.685 4.5 11.79 4.5 12 4.5C12.21 4.5 12.3135 4.5 12.4005 4.512C12.6754 4.55018 12.9304 4.67704 13.1267 4.87332C13.323 5.0696 13.4498 5.32456 13.488 5.5995C13.5 5.685 13.5 5.79 13.5 6C13.5 6.21 13.5 6.3135 13.488 6.4005C13.4498 6.67544 13.323 6.9304 13.1267 7.12668C12.9304 7.32296 12.6754 7.44982 12.4005 7.488C12.315 7.5 12.21 7.5 12 7.5C11.79 7.5 11.6865 7.5 11.5995 7.488C11.3246 7.44982 11.0696 7.32296 10.8733 7.12668C10.677 6.9304 10.5502 6.67544 10.512 6.4005C10.5 6.315 10.5 6.21 10.5 6ZM10.5 12C10.5 11.79 10.5 11.6865 10.512 11.5995C10.5502 11.3246 10.677 11.0696 10.8733 10.8733C11.0696 10.677 11.3246 10.5502 11.5995 10.512C11.685 10.5 11.79 10.5 12 10.5C12.21 10.5 12.3135 10.5 12.4005 10.512C12.6754 10.5502 12.9304 10.677 13.1267 10.8733C13.323 11.0696 13.4498 11.3246 13.488 11.5995C13.5 11.685 13.5 11.79 13.5 12C13.5 12.21 13.5 12.3135 13.488 12.4005C13.4498 12.6754 13.323 12.9304 13.1267 13.1267C12.9304 13.323 12.6754 13.4498 12.4005 13.488C12.315 13.5 12.21 13.5 12 13.5C11.79 13.5 11.6865 13.5 11.5995 13.488C11.3246 13.4498 11.0696 13.323 10.8733 13.1267C10.677 12.9304 10.5502 12.6754 10.512 12.4005C10.5 12.315 10.5 12.21 10.5 12ZM10.5 18C10.5 17.7915 10.5 17.6865 10.512 17.5995C10.5504 17.3251 10.6772 17.0706 10.8731 16.8746C11.0691 16.6787 11.3236 16.5519 11.598 16.5135C11.6865 16.5015 11.79 16.5015 11.9985 16.5015C12.207 16.5015 12.3135 16.5015 12.399 16.5135C12.6734 16.5519 12.9279 16.6787 13.1239 16.8746C13.3198 17.0706 13.4466 17.3251 13.485 17.5995C13.497 17.6865 13.497 17.7915 13.497 18C13.497 18.2085 13.497 18.3135 13.485 18.4005C13.4466 18.6749 13.3198 18.9294 13.1239 19.1254C12.9279 19.3213 12.6734 19.4481 12.399 19.4865C12.312 19.4985 12.207 19.4985 11.9985 19.4985C11.79 19.4985 11.685 19.4985 11.598 19.4865C11.3236 19.4481 11.0691 19.3213 10.8731 19.1254C10.6772 18.9294 10.5504 18.6749 10.512 18.4005C10.5 18.3135 10.5 18.2085 10.5 18Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1"/>
                        </svg>
                    </div>
                </a>

                <a href="#" className={`${isMenuOpen ? "pl-12" : "pl-6"} pb-2 pt-2 text-gray-900  font-bold flex flex-row content-center focus:outline-none transition-colors duration-1000 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100`}>
                    <Workspace color={"#21A6C3"}/>
                    <span className={`${isMenuOpen ? "w-48 pl-2 flex flex-row justify-between" : "hidden"}`}>
                        {`${isMenuOpen ? "Espace 3" : ""}`}
                    </span>
                    <div className={!isMenuOpen ? "hidden" : ""}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" stroke="currentColor">
                            <path d="M10.5 6C10.5 5.79 10.5 5.6865 10.512 5.5995C10.5502 5.32456 10.677 5.0696 10.8733 4.87332C11.0696 4.67704 11.3246 4.55018 11.5995 4.512C11.685 4.5 11.79 4.5 12 4.5C12.21 4.5 12.3135 4.5 12.4005 4.512C12.6754 4.55018 12.9304 4.67704 13.1267 4.87332C13.323 5.0696 13.4498 5.32456 13.488 5.5995C13.5 5.685 13.5 5.79 13.5 6C13.5 6.21 13.5 6.3135 13.488 6.4005C13.4498 6.67544 13.323 6.9304 13.1267 7.12668C12.9304 7.32296 12.6754 7.44982 12.4005 7.488C12.315 7.5 12.21 7.5 12 7.5C11.79 7.5 11.6865 7.5 11.5995 7.488C11.3246 7.44982 11.0696 7.32296 10.8733 7.12668C10.677 6.9304 10.5502 6.67544 10.512 6.4005C10.5 6.315 10.5 6.21 10.5 6ZM10.5 12C10.5 11.79 10.5 11.6865 10.512 11.5995C10.5502 11.3246 10.677 11.0696 10.8733 10.8733C11.0696 10.677 11.3246 10.5502 11.5995 10.512C11.685 10.5 11.79 10.5 12 10.5C12.21 10.5 12.3135 10.5 12.4005 10.512C12.6754 10.5502 12.9304 10.677 13.1267 10.8733C13.323 11.0696 13.4498 11.3246 13.488 11.5995C13.5 11.685 13.5 11.79 13.5 12C13.5 12.21 13.5 12.3135 13.488 12.4005C13.4498 12.6754 13.323 12.9304 13.1267 13.1267C12.9304 13.323 12.6754 13.4498 12.4005 13.488C12.315 13.5 12.21 13.5 12 13.5C11.79 13.5 11.6865 13.5 11.5995 13.488C11.3246 13.4498 11.0696 13.323 10.8733 13.1267C10.677 12.9304 10.5502 12.6754 10.512 12.4005C10.5 12.315 10.5 12.21 10.5 12ZM10.5 18C10.5 17.7915 10.5 17.6865 10.512 17.5995C10.5504 17.3251 10.6772 17.0706 10.8731 16.8746C11.0691 16.6787 11.3236 16.5519 11.598 16.5135C11.6865 16.5015 11.79 16.5015 11.9985 16.5015C12.207 16.5015 12.3135 16.5015 12.399 16.5135C12.6734 16.5519 12.9279 16.6787 13.1239 16.8746C13.3198 17.0706 13.4466 17.3251 13.485 17.5995C13.497 17.6865 13.497 17.7915 13.497 18C13.497 18.2085 13.497 18.3135 13.485 18.4005C13.4466 18.6749 13.3198 18.9294 13.1239 19.1254C12.9279 19.3213 12.6734 19.4481 12.399 19.4865C12.312 19.4985 12.207 19.4985 11.9985 19.4985C11.79 19.4985 11.685 19.4985 11.598 19.4865C11.3236 19.4481 11.0691 19.3213 10.8731 19.1254C10.6772 18.9294 10.5504 18.6749 10.512 18.4005C10.5 18.3135 10.5 18.2085 10.5 18Z"  fill="currentColor" stroke="currentColor" strokeWidth="0.1"/>
                        </svg>
                    </div>
                </a>

                <a href="#" className="p-4 pl-6  text-gray-900 font-bold flex flex-row content-center focus:outline-none transition-colors duration-1000 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100">
                    <Members/>
                    <span className="pl-2">
                        {`${isMenuOpen ? "Membres" : ""}`}
                    </span>
                </a>

                <a href="#" className={`${isMenuOpen ? "pl-12" : "pl-6"} pb-2 pt-2 text-gray-900  font-bold flex flex-row content-center focus:outline-none transition-colors duration-1000 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100`}>
                    <Person/>
                    <span className={`${isMenuOpen ? "w-48 pl-2 flex flex-row justify-between" : "hidden"}`}>
                        {`${isMenuOpen ? "Mike Steal" : ""}`}
                    </span>
                </a>
                <button type="button" className={`${isMenuOpen ? "justify-evenly p-2" : "p-2"} flex flex-row-reverse items-center mt-auto cursor-pointer text-gray-900 font-bold focus:outline-none transition-colors duration-1000 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100"`} onClick={toggleDarkMode}>
                    {darkMode ? <ToggleOnDarkMode /> : <ToggleOffDarkMode/>}
                    {`${isMenuOpen ? "Thème" : ""}`}
                </button>

            </aside>
            
            <Navbar/>
        </>
    );
}

