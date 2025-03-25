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
        return null;
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
        handleApiError(error);
        return null;
    }
}

export async function getBoards() {
    try {
        const response = await trelloApi.get('members/me/boards');
        return response.data || [];
    } catch (error) {
        handleApiError(error);
        return [];
    }
}

export async function getLists(boardId) {
    try {
        const response = await trelloApi.get(`boards/${boardId}/lists`);
        return response.data || [];
    } catch (error) {
        handleApiError(error);
        return [];
    }
}

export async function getCards(listId) {
    try {
        const response = await trelloApi.get(`lists/${listId}/cards`);
        return response.data || [];
    } catch (error) {
        handleApiError(error);
        return [];
    }
}

export async function addList(boardId, listName) {
    try {
        const response = await trelloApi.post('lists', { name: listName, idBoard: boardId });
        showNotification('Liste créée avec succès !', 'success');
        return response.data;
    } catch (error) {
        handleApiError(error);
        return null;
    }
}

export async function addCard(listId, cardName) {
    try {
        const response = await trelloApi.post('cards', { name: cardName, idList: listId });
        showNotification('Carte créée avec succès !', 'success');
        return response.data;
    } catch (error) {
        handleApiError(error);
        return null;
    }
}

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
        handleApiError(error);
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
        handleApiError(error);
        return null;
    }
}

export async function getBoardMembers(boardId) {
    try {
        const response = await trelloApi.get(`boards/${boardId}/members`);
        return response.data || [];
    } catch (error) {
        handleApiError(error);
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
        handleApiError(error);
        return false;
    }
}

export const inviteMember = async (boardId, email) => {
    try {
        const board = await checkPermissions(boardId);
        if (!board) {
            showNotification('Vous n\'avez pas les permissions nécessaires pour inviter des membres.', 'error');
            return false;
        }

        await trelloApi.put(`boards/${boardId}/members`, null, {
            params: {
                email: email,
            }
        });

        showNotification('Invitation envoyée avec succès !', 'success');
        return true;
    } catch (error) {
        if (error.response?.status === 400) {
            showNotification('Adresse email invalide ou déjà membre du tableau.', 'error');
        } else {
            handleApiError(error);
        }
        return false;
    }
};