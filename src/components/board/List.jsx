import {useState} from 'react';
import PropTypes from 'prop-types';
import Card from './Card.jsx';
import {deleteList, updateList} from '../../api/trelloApi.js';
import CreateCardForm from "./CreateCardForm.jsx";
import DeleteListModal from "./DeleteListModal.jsx";

List.propTypes = {
    list: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        cards: PropTypes.array
    }).isRequired,
    onUpdate: PropTypes.func.isRequired
};

export default function List({list, onUpdate}) {
    const [isEditing, setIsEditing] = useState(false);
    const [listName, setListName] = useState(list.name);
    const [showCardForm, setShowCardForm] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    function update() {
        setIsEditing(false);
        // Supprimer setListName(list.name) ici
        updateList(list.id, {name: listName})
            .then(() => {
                onUpdate();
            })
            .catch((error) => {
                console.error("Error updating list name:", error);
            });
    }
    function handleDelete() {
        setIsDeleteModalOpen(true);
    }

    function confirmDelete() {
        deleteList(list.id)
            .then(() => {
                onUpdate();
            })
            .catch((error) => {
                console.error("Error deleting list:", error);
            });
        setIsDeleteModalOpen(false);
    }

    return (
        <div
            className="bg-white dark:bg-brandColorDark border-1 border-gray-200 dark:border-pureDarkStroke rounded-2xl min-w-[280px] w-[280px] flex flex-col max-h-full">
            <div className="p-3 flex justify-between items-center">
                {isEditing ? (
                    <div className="flex w-full">
                        <input
                            type="text"
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                            className="flex-grow rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
                            autoFocus
                        />
                        <button
                            onClick={update}
                            className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                        >
                            ✓
                        </button>
                    </div>
                ) : (
                    <h3
                        className="font-semibold text-gray-800 dark:text-white cursor-pointer"
                        onClick={() => setIsEditing(true)}
                    >
                        {list.name}
                    </h3>
                )}
                <DeleteListModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                    listName={list.name}
                />
                <button
                    onClick={handleDelete}
                    className="text-gray-500 hover:text-red-500 dark:text-gray-400"
                >
                    ×
                </button>
            </div>

            <div className="overflow-y-auto p-2 flex-grow">
                {list.cards && list.cards.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                        onUpdate={onUpdate}
                    />
                ))}
            </div>

            <div className="p-2">
                {showCardForm ? (
                    <CreateCardForm
                        listId={list.id}
                        onCardCreated={() => {
                            onUpdate();
                            setShowCardForm(false);
                        }}
                        onCancel={() => setShowCardForm(false)}
                    />
                ) : (
                    <button
                        onClick={() => setShowCardForm(true)}
                        className="w-full text-left px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                        + Ajouter une carte
                    </button>
                )}
            </div>
        </div>
    );
}
