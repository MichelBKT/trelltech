import { useState, useEffect } from "react";
import { getCards, getLists } from "../api/trelloApi.js";

export default function useFetchBoardData(boardId) {
    const [boardData, setBoardData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lists, setLists] = useState([]);

    useEffect(() => {
        const fetchBoardData = async () => {
            try {
                const response = await fetch(`https://api.trello.com/1/members/me/boards?key=${import.meta.env.VITE_TRELLO_API_KEY}&token=${import.meta.env.VITE_TRELLO_API_TOKEN}`);
                const data = await response.json();
                setBoardData(data);
                const listsData = await getLists(boardId);
                const listsWithCards = await Promise.all(
                    listsData.map(async (list) => {
                        const cards = await getCards(list.id);
                        return { ...list, cards };
                    })
                );
                setLists(listsWithCards);
            } catch (err) {
                console.error('Erreur lors du chargement des données', err);
                setError('Impossible de charger le tableau');
            } finally {
                setLoading(false);
            }
        };

        fetchBoardData().then();
    }, [boardId]);

    return { boardData, lists, error, loading };
}