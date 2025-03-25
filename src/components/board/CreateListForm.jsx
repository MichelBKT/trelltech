// components/board/CreateListForm.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import { createList } from '../../api/trelloApi';

CreateListForm.propTypes = {
    boardId: PropTypes.string.isRequired,
    onListCreated: PropTypes.func.isRequired,
};

export default function CreateListForm({ boardId, onListCreated }) {
    const [showForm, setShowForm] = useState(false);
    const [listName, setListName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!listName.trim()) return;

        try {
            setIsSubmitting(true);
            await createList({ name: listName, idBoard: boardId });
            setListName('');
            setShowForm(false);
            onListCreated();
        } catch (error) {
            console.error('Erreur lors de la création de la liste', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!showForm) {
        return (
            <div
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg min-w-[280px] p-3 cursor-pointer"
                onClick={() => setShowForm(true)}
            >
                <span className="text-gray-700 dark:text-gray-200">+ Ajouter une autre liste</span>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg min-w-[280px] p-3">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Entrez le titre de la liste..."
                    className="w-full px-2 py-1 rounded mb-2 dark:bg-gray-700 dark:text-white"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    autoFocus
                />
                <div className="flex space-x-2">
                    <button
                        type="submit"
                        className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
                        disabled={isSubmitting || !listName.trim()}
                    >
                        {isSubmitting ? 'Création...' : 'Ajouter la liste'}
                    </button>
                    <button
                        type="button"
                        className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded"
                        onClick={() => setShowForm(false)}
                    >
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    );
}
