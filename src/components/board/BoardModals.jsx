import {useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";

DeleteBoardModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    boardName: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired

};

export default function DeleteBoardModal({ isOpen, onClose, onConfirm, boardName, isLoading }) {
    // Gestion du clic en dehors du modal
    const modalRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 dark:bg-pureDarkStroke bg-pureDarkBG opacity-80 flex items-center justify-center z-50">
            <div ref={modalRef} className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                    Confirmer la suppression
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Êtes-vous sûr de vouloir supprimer la liste {boardName} ?
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        disabled={isLoading}
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        disabled={isLoading}
                    >
                        {isLoading ? "Suppression..." : "Supprimer"}
                    </button>
                </div>
            </div>
        </div>
    );
}

EditBoardModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func.isRequired,
    currentName: PropTypes.string.isRequired,
}

export function EditBoardModal({ isOpen, onClose, onConfirm, currentName }) {
    const [newName, setNewName] = useState(currentName);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-pureDark bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Modifier le tableau</h3>
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Nouveau nom"
                />
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={() => onConfirm(newName)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Enregistrer
                    </button>
                </div>
            </div>
        </div>
    );
}