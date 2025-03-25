// components/board/List.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import CreateCardForm from './CreateCardForm';
import { updateList, deleteList } from '../../api/trelloApi';

List.propTypes = {
    list: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired,
};

export default function List({ list, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [listName, setListName] = useState(list.name);
    const [showCardForm, setShowCardForm] = useState(false);

    const handleSaveName = async () => {
        try {
            await updateList(list.id, { name: listName });
            setIsEditing(false);
            onUpdate();
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la liste', error);
        }
    };

    const handleDeleteList = async () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette liste ?')) {
            try {
                await deleteList(list.id);
                onUpdate();
            } catch (error) {
                console.error('Erreur lors de la suppression de la liste', error);
            }
        }
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg min-w-[280px] w-[280px] flex flex-col max-h-full">
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
                            onClick={handleSaveName}
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
                <button
                    onClick={handleDeleteList}
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
