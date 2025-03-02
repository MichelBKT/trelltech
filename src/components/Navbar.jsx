import Workspace from "./icons/Workspace.jsx";
import Notification from "./icons/Notification.jsx";
import Person from "./icons/Person.jsx";

export default function Navbar() {
    return (
        <>
            <div className={"flex w-full h-20 relative bg-white dark:bg-gray-900 duration-1000 content-center border-b-2 border-gray-200 dark:border-gray-700"}>
                <div className={"p-6 w-full justify-items-end flex font-bold text-black dark:text-gray-300 text-xl gap-4"}>
                    <Workspace color={"#ECB500"}/>
                    Espace 100
                </div>
                <div className={"w-full flex flex-row items-center justify-end"}>
                    <Notification />
                </div>
                <div className={"p-2 pl-6 w-100 text-black dark:text-gray-300 items-center flex flex-row justify-end"}>
                    Bonjour John
                </div>
                <div className={"p-2 pl-6 w-32 text-black dark:text-gray-500 items-center flex flex-row text-xl justify-end"}>
                    <Person />
                </div>
            </div>
        </>
    )
}