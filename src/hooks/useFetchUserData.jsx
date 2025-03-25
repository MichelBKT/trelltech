import {useEffect, useState} from "react";
import Cookies from 'js-cookie';

export default function useFetchUserData() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = Cookies.get('trello_token');
                if (!token) {
                    console.error('Aucun token trouvé');
                    return;
                }
                const response = await fetch(`https://api.trello.com/1/members/me?key=${import.meta.env.VITE_TRELLO_API_KEY}&token=${token}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
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