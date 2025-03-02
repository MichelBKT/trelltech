import Workspace from "./icons/Workspace.jsx";

export default function Navbar() {
    return (
        <>
            <div className={"flex w-full h-20 relative bg-white dark:bg-gray-900 content-center"}>
                <div className={"p-4 w-full justify-items-end flex font-bold text-black dark:text-white text-2xl gap-4"}>
                    <Workspace color={"#ECB500"}/>
                    Espace 1
                </div>
            </div>
        </>
    )
}