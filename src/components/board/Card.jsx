import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { updateCard, deleteCard, getBoardMembers } from '../../api/trelloApi';
import DeleteCardModal from './DeleteCardModal';
import { Draggable } from 'react-beautiful-dnd';
import CardMemberMenu from './CardMemberMenu';
import { UserIcon } from '@heroicons/react/24/outline';

Card.propTypes = {
    card: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    listId: PropTypes.string.isRequired,
    boardId: PropTypes.string.isRequired,
};

export default function Card({ card, onUpdate, index, boardId }) {
    const [isEditing, setIsEditing] = useState(false);
    const [cardName, setCardName] = useState(card.name);
    const [cardDesc, setCardDesc] = useState(card.desc || '');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [members, setMembers] = useState([]);
    const [isMemberMenuOpen, setIsMemberMenuOpen] = useState(false);
    const memberButtonRef = useRef(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const boardMembers = await getBoardMembers(boardId);
                setMembers(boardMembers);
            } catch (error) {
                console.error('Erreur lors de la récupération des membres:', error);
            }
        };
        fetchMembers();
    }, [boardId]);

    const handleSaveCard = async () => {
        try {
            await updateCard(card.id, { name: cardName, desc: cardDesc });
            setIsEditing(false);
            onUpdate();
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la carte', error);
        }
    };

    const handleDeleteCard = () => {
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteCard = async () => {
        try {
            await deleteCard(card.id);
            onUpdate();
        } catch (error) {
            console.error('Erreur lors de la suppression de la carte', error);
        } finally {
            setIsDeleteModalOpen(false);
        }
    };

    const getAvatarUrl = (member) => {
        if (!member.avatarHash) return null;
        return `https://trello-members.s3.amazonaws.com/${member.id}/${member.avatarHash}/170.png`;
    };

    if (isEditing) {
        return (
            <div className="bg-white dark:bg-gray-700 p-3 rounded shadow mb-2">
                <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full mb-2 px-2 py-1 rounded dark:bg-gray-600 dark:text-white"
                    placeholder="Titre de la carte"
                    autoFocus
                />
                <textarea
                    value={cardDesc}
                    onChange={(e) => setCardDesc(e.target.value)}
                    className="w-full px-2 py-1 rounded mb-2 dark:bg-gray-600 dark:text-white"
                    placeholder="Description (optionnel)"
                    rows={3}
                />
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => setIsEditing(false)}
                        className="px-3 py-1 bg-gray-300 dark:bg-gray-500 rounded"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleSaveCard}
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                        Enregistrer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided, snapshot) => (
                <>
                    <div
                        className={`bg-white dark:bg-brandColor p-3 rounded shadow mb-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 ${
                            snapshot.isDragging ? 'bg-blue-100' : ''
                        }`}
                        onClick={() => setIsEditing(true)}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <div className="flex justify-between items-start">
                            <h4 className="text-gray-800 dark:text-white font-medium">{card.name}</h4>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteCard();
                                }}
                                className="text-gray-500 hover:text-red-500 dark:text-gray-400"
                            >
                                ×
                            </button>
                        </div>
                        {card.desc && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 truncate">
                                {card.desc}
                            </p>
                        )}
                        {card.labels && card.labels.length > 0 && (
                            <div className="flex mt-2 flex-wrap gap-1">
                                {card.labels.map((label) => (
                                    <span
                                        key={label.id}
                                        className={`inline-block px-2 py-1 text-xs rounded ${
                                            label.color ? `bg-${label.color}-500` : 'bg-gray-300'
                                        } text-white`}
                                    >
                                        {label.name}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className="mt-2 flex items-center">
                            <button
                                ref={memberButtonRef}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMemberMenuOpen(!isMemberMenuOpen);
                                }}
                                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <UserIcon className="w-4 h-4" />
                                <span className="text-xs">
                                    {card.idMembers?.length || 0}
                                </span>
                            </button>
                            <div className="ml-2 flex -space-x-2">
                                {members
                                    .filter(member => card.idMembers?.includes(member.id))
                                    .map(member => (
                                        <div key={member.id} className="relative">
                                            {getAvatarUrl(member) ? (
                                                <img
                                                    src={getAvatarUrl(member)}
                                                    alt={member.fullName}
                                                    className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                                                    onError={(e) => {
                                                        console.error('Erreur de chargement de l\'avatar');
                                                        e.target.style.display = 'none';
                                                        e.target.parentElement.innerHTML = `
                                                            <div class="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-2 border-white dark:border-gray-800">
                                                                <span class="text-xs text-gray-600 dark:text-gray-300">
                                                                    ${member.initials}
                                                                </span>
                                                            </div>
                                                        `;
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-2 border-white dark:border-gray-800">
                                                    <span className="text-xs text-gray-600 dark:text-gray-300">
                                                        {member.initials}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <DeleteCardModal
                        isOpen={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onConfirm={confirmDeleteCard}
                        cardName={card.name}
                    />
                    <CardMemberMenu
                        isOpen={isMemberMenuOpen}
                        onClose={() => setIsMemberMenuOpen(false)}
                        members={members}
                        card={card}
                        onUpdate={onUpdate}
                    />
                </>
            )}
        </Draggable>
    );
}