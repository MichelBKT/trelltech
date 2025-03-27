
import { useState } from 'react';
import PropTypes from 'prop-types';
import { createCard } from '../../api/trelloApi';

CreateCardForm.propTypes = {
    listId: PropTypes.string.isRequired,
    onCardCreated: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default function CreateCardForm({ listId, onCardCreated, onCancel }) {
    const [cardName, setCardName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!cardName.trim()) return;

        try {
            setIsSubmitting(true);
            await createCard({ name: cardName, idList: listId });
            onCardCreated();
            setCardName('');
        } catch (error) {
            console.error('Erreur lors de la création de la carte', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-700 p-2 rounded-2xl shadow">
      <textarea
          placeholder="Entrez un titre pour cette carte..."
          className="w-full px-2 py-1 rounded-lg mb-2 dark:bg-gray-600 dark:text-white"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          rows={3}
          autoFocus
      />
            <div className="flex space-x-2">
                <button
                    type="submit"
                    className="px-3 py-1 bg-purple-800 text-white rounded disabled:opacity-50"
                    disabled={isSubmitting || !cardName.trim()}
                >
                    {isSubmitting ? 'Création...' : 'Ajouter'}
                </button>
                <button
                    type="button"
                    className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded"
                    onClick={onCancel}
                >
                    Annuler
                </button>
            </div>
        </form>
    );
}
