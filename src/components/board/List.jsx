import { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card.jsx';
import {
    deleteList,
    updateList,
} from '../../api/trelloApi.js';
import CreateCardForm from "./CreateCardForm.jsx";
import DeleteListModal from "./DeleteListModal.jsx";
import {Draggable, Droppable} from 'react-beautiful-dnd';

List.propTypes = {
    list: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        cards: PropTypes.array,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
};

// eslint-disable-next-line react/prop-types
export default function List({ list, onUpdate, index, boardId }) {
    const [isEditing, setIsEditing] = useState(false);
    const [listName, setListName] = useState(list.name);
    const [showCardForm, setShowCardForm] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

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
        <Draggable draggableId={list.id} index={index} isDragDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="border-1 border-gray-200 dark:border-pureDarkStroke rounded-2xl min-w-[280px] w-[280px] flex flex-col max-h-full"
                >
                    <div className="p-3 flex justify-between items-center" {...provided.dragHandleProps}>
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

                    <Droppable droppableId={list.id} type="CARD" isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false}>
                        {(provided, snapshot) => (
                            <div
                                className="flex-grow"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{
                                    background: snapshot.isDraggingOver ? '#e0f7fa' : 'inherit',
                                    minHeight: '100px',
                                    maxHeight: 'calc(100vh - 200px)',
                                    overflowY: 'auto',
                                    padding: '8px',
                                    transition: 'background-color 0.2s ease'
                                }}
                            >
                                {list.cards && list.cards.map((card, index) => (
                                    <Card
                                        key={card.id}
                                        card={card}
                                        onUpdate={onUpdate}
                                        index={index}
                                        listId={list.id}
                                        boardId={boardId}
                                        isDragging={isDragging}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <div className="p-2">
                        {!showCardForm ? (
                            <button
                                onClick={() => setShowCardForm(true)}
                                className="m-2 p-2 text-gray-600 hover:bg-gray-100 rounded dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                + Ajouter une carte
                            </button>
                        ) : (
                            <CreateCardForm
                                listId={list.id}
                                onCardCreated={() => {
                                    setShowCardForm(false);
                                    onUpdate();
                                }}
                                onCancel={() => setShowCardForm(false)}
                            />
                        )}
                    </div>
                </div>
            )}
        </Draggable>
    );
}

