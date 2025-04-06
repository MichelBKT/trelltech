import DeleteBoardModal, { EditBoardModal, BoardMembersModal } from "./BoardModals.jsx";
import { deleteList, updateList } from "../../api/trelloApi.js";
import PropTypes from "prop-types";
import { useState } from "react";

BoardItem.propTypes = {
    list: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        cards: PropTypes.arrayOf(PropTypes.object).isRequired,
        idBoard: PropTypes.string
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
}

export default function BoardItem({ list, onUpdate }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteConfirm = async () => {
        setIsLoading(true);
        try {
            await deleteList(list.id);
            onUpdate();
        } catch (error) {
            console.error("Erreur lors de la suppression de la liste:", error);
            // Afficher un message d'erreur à l'utilisateur
        } finally {
            setIsLoading(false);
            setIsDeleteModalOpen(false);
        }
    };

    const handleEditConfirm = async (newName) => {
        setIsLoading(true);
        try {
            await updateList(list.id, { name: newName });
            onUpdate();
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la liste:", error);
            // Afficher un message d'erreur à l'utilisateur
        } finally {
            setIsLoading(false);
            setIsEditModalOpen(false);
        }
    };

    return (
        <>
            <div
                className="bg-white dark:bg-brandColorDark border-1 border-gray-200 dark:border-pureDarkStroke
                 min-w-[280px] w-[280px] flex flex-col max-h-full"
            >

                <DeleteBoardModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleDeleteConfirm}
                    boardName={list.name}
                    isLoading={isLoading}
                />

                <EditBoardModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onConfirm={handleEditConfirm}
                    currentName={list.name}
                    isLoading={isLoading}
                />

                <BoardMembersModal
                    isOpen={isMembersModalOpen}
                    onClose={() => setIsMembersModalOpen(false)}
                    boardId={list.idBoard || ""}
                    boardName={list.name}
                />
            </div>
        </>
    )
}