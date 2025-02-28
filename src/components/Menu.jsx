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

export default function Menu() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (Cookies.get('dark') === 'true') {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        }
    }, []);

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
            <aside className="flex">
                <div className="flex flex-col items-center w-20 h-screen py-2 space-y-2 bg-white dark:bg-gray-900 border-r-2 border-gray-200 dark:border-gray-800">
                    <a href="#"
                       className="p-2 text-gray-500 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100 gap-y-8">
                        <ToggleMenu/>
                    </a>

                    <a href="#"
                       className="p-2 text-gray-500 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100 gap-y-8">
                        <BrandWhiteIcon />
                    </a>

                    <a href="#"
                       className="p-3 text-gray-500 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100">
                        <Home/>
                    </a>

                    <a href="#"
                       className="p-2 text-gray-500 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100">
                        <Suitcase />
                    </a>

                    <a href="#"
                       className="p-3 text-gray-500 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100">
                        <Workspace color={"#ECB500"}/>
                    </a>

                    <a href="#"
                       className="p-3 text-gray-500 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100">
                        <Workspace color={"#23C000"}/>
                    </a>

                    <a href="#"
                       className="p-3 text-gray-500 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100">
                        <Workspace color={"#21A6C3"}/>
                    </a>

                    <a href="#"
                         className="p-3 text-gray-500 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100">
                          <Members/>
                    </a>

                    <a href="#"
                         className="p-3 text-gray-500 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100">
                          <Person/>
                    </a>

                    <button type="button" className="mt-auto cursor-pointer" onClick={toggleDarkMode}>
                        {darkMode ? <ToggleOnDarkMode /> : <ToggleOffDarkMode/>}
                    </button>
                </div>
            </aside>
        </>
    );
}
