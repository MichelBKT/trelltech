import {trelloApi} from "../api/trelloApi.js";

export async function createBoard(boardName) {
    trelloApi.post('boards', { name: boardName }).then(response => {
        return response.data;
    }).catch(error => {
        if (error.response.status === 429) {
            console.error('Limite de taux dépassée. Réessayez plus tard.');
        } else if (error.response.status === 401) {
            console.error('Authentification échouée. Vérifiez votre clé API et votre jeton.');
        } else {
            console.error('Erreur:', error.message);
        }
    });
}