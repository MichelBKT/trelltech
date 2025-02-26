import axios from 'axios';
import process from 'process';

process.env.TRELLO_API_KEY = process.key;
process.env.TRELLO_API_TOKEN = process.token;
process.env.TRELLO_API_URL = process.url;


const API_KEY = process.key;
const API_TOKEN = process.token;
const API_URL = process.url;

export const trelloApi = axios.create({
    baseURL: API_URL,
    params: {
        key: API_KEY,
        token: API_TOKEN,
    }
});

async function handleApiError(error) {
    if (error.response.status === 429) {
        console.error('Limite de taux dépassée. Réessayez plus tard.');
    } else if (error.response.status === 401) {
        console.error('Authentification échouée. Vérifiez votre clé API et votre jeton.');
    } else {
        console.error('Erreur:', error.message);
    }
}

export async function addList(boardId, listName) {
    try {
        const response = await trelloApi.post('lists', { name: listName, idBoard: boardId });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function addCard(listId, cardName) {
    try {
        const response = await trelloApi.post('cards', { name: cardName, idList: listId });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
}