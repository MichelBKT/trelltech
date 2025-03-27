import { useState } from 'react';
import PropTypes from 'prop-types';
import { updateCard, deleteCard } from '../../api/trelloApi';

Card.propTypes = {
    card: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default function Card({ card, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [cardName, setCardName] = useState(card.name);
    const [cardDesc, setCardDesc] = useState(card.desc || '');


    const handleSaveCard = async () => {
        try {
            await updateCard(card.id, { name: cardName, desc: cardDesc });
            setIsEditing(false);
            onUpdate();
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la carte', error);
        }
    };

    const handleDeleteCard = async () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette carte ?')) {
            try {
                await deleteCard(card.id);
                onUpdate();
            } catch (error) {
                console.error('Erreur lors de la suppression de la carte', error);
            }
        }
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
        <div
            className="bg-white dark:bg-gray-700 p-3 rounded shadow mb-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600"
            onClick={() => setIsEditing(true)}
        >
            <div className="flex justify-between items-start">
                <h4 className="text-gray-800 dark:text-white font-medium">{card.name}</h4>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCard().then();
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
                            className="inline-block h-2 w-8 rounded"
                            style={{ backgroundColor: label.color || '#ddd' }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
