import { useState } from 'react';
import Workspace from "../icons/Workspace.jsx";
import WorkspaceContextMenu from "./WorkspaceContextMenu.jsx";
import DeleteConfirmationModal, { EditWorkspaceModal } from "./WorkspaceModals.jsx";

export default function WorkspaceItem({ board, isMenuOpen, color, onDelete, onEdit }) {
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleDelete = () => {
        setIsContextMenuOpen(false);
        setIsDeleteModalOpen(true);
    };

    const handleEdit = () => {
        setIsContextMenuOpen(false);
        setIsEditModalOpen(true);
    };

    const confirmDelete = () => {
        onDelete(board.id);
        setIsDeleteModalOpen(false);
    };

    const confirmEdit = (newName) => {
        onEdit(board.id, newName);
        setIsEditModalOpen(false);
    };

    return (
        <div className="relative">
            <a href="#" className={`${isMenuOpen ? "pl-12" : "pl-6"} pb-2 pt-2 text-gray-900 font-bold flex flex-row content-center focus:outline-none transition-colors duration-1000 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100`}>
                <Workspace color={color}/>
                <span className={`${isMenuOpen ? "w-48 pl-2 flex flex-row justify-between" : "hidden"}`}>
                    {`${isMenuOpen ? board.name : ""}`}
                </span>
                {isMenuOpen && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setIsContextMenuOpen(!isContextMenuOpen);
                        }}
                        className="ml-auto mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" stroke="currentColor">
                            <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13ZM12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6ZM12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" fill="currentColor"/>
                        </svg>
                    </button>
                )}
            </a>

            <WorkspaceContextMenu
                isOpen={isContextMenuOpen}
                onClose={() => setIsContextMenuOpen(false)}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                workspaceName={board.name}
            />

            <EditWorkspaceModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onConfirm={confirmEdit}
                currentName={board.name}
            />
        </div>
    );
}