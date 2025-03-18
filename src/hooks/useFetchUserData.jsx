import {useEffect, useState} from "react";

export default function useFetchUserData() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://api.trello.com/1/members/me?key=${import.meta.env.VITE_TRELLO_API_KEY}&token=${import.meta.env.VITE_TRELLO_API_TOKEN}`);
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données utilisateur:', error);
            }
        };

        fetchUserData().then();
    }, []);

    return userData;
}