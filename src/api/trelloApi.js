import axios from 'axios';
import { showNotification } from '../components/notifications/NotificationManager';
import Cookies from 'js-cookie';

const API_KEY = import.meta.env.VITE_TRELLO_API_KEY;
const API_URL = 'https://api.trello.com/1';

export const trelloApi = axios.create({
    baseURL: API_URL,
    params: {
        key: API_KEY,
    }
});

// Intercepteur pour ajouter le token à chaque requête
trelloApi.interceptors.request.use((config) => {
    const token = Cookies.get('trello_token');
    if (token) {
        config.params.token = token;
    }
    return config;
});

async function checkPermissions(boardId) {
    try {
        const response = await trelloApi.get(`boards/${boardId}`);
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
}

async function handleApiError(error) {
    if (error.response?.status === 429) {
        showNotification('Limite de taux dépassée. Réessayez plus tard.', 'error');
    } else if (error.response?.status === 401) {
        showNotification('Vous n\'avez pas les permissions nécessaires pour effectuer cette action.', 'error');
    } else {
        showNotification('Une erreur est survenue. Veuillez réessayer.', 'error');
    }
}

export async function createBoard(name) {
    try {
        const response = await trelloApi.post('boards', { name });
        showNotification('Workspace créé avec succès !', 'success');
        return response.data;
    } catch (error) {
        await handleApiError(error);
        return null;
    }
}

export async function getBoards() {
    try {
        const response = await trelloApi.get('members/me/boards');
        return response.data || [];
    } catch (error) {
        await handleApiError(error);
        return [];
    }
}

export async function getLists(boardId) {
    try {
        const response = await trelloApi.get(`boards/${boardId}/lists`);
        return response.data || [];
    } catch (error) {
        await handleApiError(error);
        return [];
    }
}

// api/trelloApi.js
// Ajouter ces fonctions si elles n'existent pas déjà

export const getCards = async (listId) => {
    try {
        const response = await trelloApi.get(`/lists/${listId}/cards`);
        return await response.data || [];
    } catch (error) {
        await handleApiError(error)
        return [];
    }
};

export const createList = async (listData) => {
    try {
        const response = await trelloApi.post(`/lists`, {
            name: listData.name,
            idBoard: listData.idBoard,
            pos: listData.pos || 'top',
            closed: listData.closed || false,
            }
        );
        return await response.data || [];
    } catch (error) {
        await handleApiError(error);
    }
};

export const updateList = async (listId, listData) => {
    try {
        const response = await trelloApi.put(`/lists/${listId}`, {
            name: listData.name,
            closed: listData.closed,
            idBoard: listData.idBoard,
            }
        );
        return await response.data || [];
    } catch (error) {
        await handleApiError(error);
    }
};

export const deleteList = async (listId) => {
    try {
        const response = await trelloApi.put(`/lists/${listId}/closed`, {
            value: true
        });
        showNotification('Liste archivée avec succès !', 'success');
        return response.data;
    } catch (error) {
        await handleApiError(error);
        return null;
    }
}


export const createCard = async (cardData) => {
    try {
        const response = await trelloApi.post('cards', {
            name: cardData.name,
            desc: cardData.desc || '',
            idList: cardData.idList,
            due: cardData.due || null,
        });
        showNotification('Carte créée avec succès !', 'success');
        return response.data;
    } catch (error) {
        await handleApiError(error);
        return null;
    }
};

export const updateCard = async (cardId, cardData) => {
    try {
        const response = await trelloApi.put(`cards/${cardId}`, {
            name: cardData.name,
            desc: cardData.desc || '',
            due: cardData.due || null,
            idList: cardData.idList,
            }
        );
        return await response.data || [];
    } catch (error) {
        console.error("Error updating card:", error);
        throw error;
    }
};

export const deleteCard = async (cardId) => {
    try {
        const response = await trelloApi.delete(
            `cards/${cardId}?`,
            {
                method: "DELETE",
            }
        );
        showNotification('Carte supprimée avec succès !', 'success');
        return await response.data || [];
    } catch (error) {
        console.error("Error deleting card:", error);
        throw error;
    }
};




export async function deleteBoard(boardId) {
    try {
        const board = await checkPermissions(boardId);
        if (!board) {
            showNotification('Vous n\'avez pas les permissions nécessaires pour supprimer ce workspace.', 'error');
            return false;
        }
        await trelloApi.delete(`boards/${boardId}`);
        showNotification('Workspace supprimé avec succès !', 'success');
        return true;
    } catch (error) {
        await handleApiError(error);
        return false;
    }
}

export async function updateBoard(boardId, newName) {
    try {
        const board = await checkPermissions(boardId);
        if (!board) {
            showNotification('Vous n\'avez pas les permissions nécessaires pour modifier ce workspace.', 'error');
            return null;
        }
        const response = await trelloApi.put(`boards/${boardId}`, { name: newName });
        showNotification('Workspace mis à jour avec succès !', 'success');
        return response.data;
    } catch (error) {
        await handleApiError(error);
        return null;
    }
}

export async function getBoardMembers(boardId) {
    try {
        const response = await trelloApi.get(`boards/${boardId}/members`);
        return response.data || [];
    } catch (error) {
        await handleApiError(error);
        return [];
    }
}

export async function removeMember(boardId, memberId) {
    try {
        const board = await checkPermissions(boardId);
        if (!board) {
            showNotification('Vous n\'avez pas les permissions nécessaires pour supprimer ce membre.', 'error');
            return false;
        }
        await trelloApi.delete(`boards/${boardId}/members/${memberId}`);
        showNotification('Membre supprimé avec succès !', 'success');
        return true;
    } catch (error) {
        await handleApiError(error);
        return false;
    }
}

export const inviteMember = async (boardId, email) => {
    try {
        if (!boardId || typeof boardId !== 'string') {
            console.error('ID de board invalide:', boardId);
            showNotification('ID de board invalide', 'error');
            return false;
        }

        if (!email || typeof email !== 'string') {
            console.error('Email invalide:', email);
            showNotification('Email invalide', 'error');
            return false;
        }

        const board = await checkPermissions(boardId);
        if (!board) {
            showNotification('Vous n\'avez pas les permissions nécessaires pour inviter des membres.', 'error');
            return false;
        }

        console.log('Invitation en cours pour le board:', boardId, 'avec l\'email:', email);
        
        const response = await trelloApi.put(`boards/${boardId}/members`, null, {
            params: {
                email: email,
                type: 'normal'
            }
        });

        console.log('Réponse de l\'API:', response);
        showNotification('Invitation envoyée avec succès !', 'success');
        return true;
    } catch (error) {
        console.error('Erreur lors de l\'invitation:', error);
        if (error.response?.status === 400) {
            showNotification('Adresse email invalide ou déjà membre du tableau.', 'error');
        } else {
            await handleApiError(error);
        }
        return false;
    }
};

export const updateListsOrder = async (boardId, lists) => {
    try {
        // Mise à jour de toutes les positions en une seule fois
        await Promise.all(
            lists.map((list, index) =>
                trelloApi.put(`/lists/${list.id}`, {
                    pos: index * 1024 // Utilisation d'une valeur espacée pour les positions
                })
            )
        );
        showNotification('Ordre des listes mis à jour avec succès', 'success');
        return true;
    } catch (error) {
        await handleApiError(error);
        return false;
    }
};

export const updateCardsOrder = async (listId, reorderedCards) => {
    try {
        const response = await trelloApi.put(`/lists/${listId}/cards`, reorderedCards);
        return await response.data || [];

    } catch (error) {
        console.error("Error updating card order:", error);
        throw error;

    }
};

// Met à jour la position et la liste d'une carte
export const updateCardPosition = async (cardId, newPos, newListId = null) => {
    try {
        const params = { pos: newPos };
        if (newListId) {
            params.idList = newListId;
        }
        const response = await trelloApi.put(`/cards/${cardId}`, null, { params });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la carte:', error);
        throw error;
    }
};

export const assignMemberToCard = async (cardId, memberId) => {
    try {
        const response = await trelloApi.post(`cards/${cardId}/idMembers`, null, {
            params: {
                value: memberId
            }
        });
        showNotification('Membre assigné avec succès !', 'success');
        return response.data;
    } catch (error) {
        await handleApiError(error);
        return null;
    }
};

export const removeMemberFromCard = async (cardId, memberId) => {
    try {
        const response = await trelloApi.delete(`cards/${cardId}/idMembers/${memberId}`);
        showNotification('Membre retiré avec succès !', 'success');
        return response.data;
    } catch (error) {
        await handleApiError(error);
        return null;
    }
};
