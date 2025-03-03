import Workspace from "./icons/Workspace.jsx";
import Notification from "./icons/Notification.jsx";
import Person from "./icons/Person.jsx";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [greeting, setGreeting] = useState("Bonjour");

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour < 6 || currentHour >= 18) {
            setGreeting("Bonsoir");
        } else {
            setGreeting("Bonjour");
        }
    }, []);

    return (
        <>
            <div className="flex h-18 w-full bg-white dark:bg-gray-900 duration-1000 content-center border-b-2 border-gray-200 dark:border-gray-700 z-10 gap-4">
                <div className=" w-full max-md:w-0 md:ml-32 lg:justify-center justify-end flex relative items-center font-bold text-black dark:text-gray-300 min-sm:text-xs lg:text-xl gap-0 md:gap-4">
                    <Workspace color={"#ECB500"}/>
                    Espace 1
                </div>
                <div className="w-full max-md:ml-2 flex items-center justify-end">
                    <Notification />
                </div>
                <div className="max-md:invisible max-md:w-0 w-72 flex p-2 text-black dark:text-gray-300 items-center justify-end">
                    {greeting} John
                </div>
                <div className="p-2 px-6 text-black dark:text-gray-500 flex items-center text-xl">
                    <Person />
                </div>
            </div>
        </>
    );
}