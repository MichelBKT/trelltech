import {useState, useEffect, useCallback} from "react";
import { getCards, getLists } from "../api/trelloApi.js";

export default function useFetchBoardData(boardId) {
    const [lists, setLists] = useState([]);

    const fetchData = useCallback(async () => {
        if (!boardId) return;
        try {
            const listsData = await getLists(boardId);

            // Récupérer les cartes pour chaque liste
            const listsWithCards = await Promise.all(
                listsData.map(async (list) => {
                    const cards = await getCards(list.id);
                    return {
                        ...list,
                        cards
                    };
                })
            );

            setLists(listsWithCards);
        } catch (error) {
            console.error('Erreur lors du chargement des données', error);
        }
    }, [boardId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { lists, refreshData: fetchData };
}
