import { useState } from 'react';
import PropTypes from "prop-types";
import LoadingOverlay from '../LoadingOverlay.jsx';

CreateWorkspaceModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
};

export default function CreateWorkspaceModal({ isOpen, onClose, onCreate }) {
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim()) {
            try {
                setIsLoading(true);
                await onCreate(name.trim());
                setName('');
                onClose();
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <LoadingOverlay isVisible={isLoading} />
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Créer un nouveau workspace</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Nom du workspace"
                        autoFocus
                    />
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Créer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 