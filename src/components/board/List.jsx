import { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card.jsx';
import {
    deleteList,
    updateList,
    createCard,
    updateCardsOrder
} from '../../api/trelloApi.js';
import CreateCardForm from "./CreateCardForm.jsx";
import DeleteListModal from "./DeleteListModal.jsx";
import { Droppable } from 'react-beautiful-dnd';

List.propTypes = {
    list: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        cards: PropTypes.array
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired,
    dragHandleProps: PropTypes.object,
};

export default function List({ list, onUpdate, boardId, dragHandleProps }) {
    const [isEditing, setIsEditing] = useState(false);
    const [listName, setListName] = useState(list.name);
    const [showCardForm, setShowCardForm] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const update = async () => {
        setIsEditing(false);
        try {
            await updateList(list.id, { name: listName });
            onUpdate();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du nom de la liste:", error);
        }
    };

    const handleDelete = () => {
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteList(list.id);
            onUpdate();
        } catch (error) {
            console.error("Erreur lors de la suppression de la liste:", error);
        }
        setIsDeleteModalOpen(false);
    };

    return (
        <div
            className="bg-white dark:bg-brandColorDark border-1 border-gray-200 dark:border-pureDarkStroke rounded-2xl min-w-[280px] w-[280px] flex flex-col max-h-full"
        >
            <div className="p-3 flex justify-between items-center" {...dragHandleProps}>
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

            <Droppable droppableId={list.id} type="CARD">
                {(provided, snapshot) => (
                    <div
                        className="overflow-y-auto p-2 flex-grow"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                            background: snapshot.isDraggingOver ? '#e0f7fa' : 'inherit',
                            minHeight: '100px',
                        }}
                    >
                        {list.cards && list.cards.map((card, index) => (
                            <Card
                                key={card.id}
                                card={card}
                                onUpdate={onUpdate}
                                index={index}
                                listId={list.id}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

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
                        className="w-full text-left text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        + Ajouter une carte
                    </button>
                )}
            </div>
        </div>
    );
}