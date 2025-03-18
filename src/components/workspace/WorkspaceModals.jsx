import { useState } from 'react';
import PropTypes from "prop-types";

DeleteConfirmationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    workspaceName: PropTypes.string.isRequired,
};

export default function DeleteConfirmationModal({ isOpen, onClose, onConfirm, workspaceName }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Confirmer la suppression</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Êtes-vous sûr de vouloir supprimer le workspace "{workspaceName}" ?
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
}

export function EditWorkspaceModal({ isOpen, onClose, onConfirm, currentName }) {
    const [newName, setNewName] = useState(currentName);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Modifier le workspace</h3>
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