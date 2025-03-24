import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Callback() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = () => {
            const hash = window.location.hash;
            if (hash) {
                const token = hash.replace('#token=', '');
                Cookies.set('trello_token', token, { expires: 365 });
                navigate('/home');
            }
        };

        handleCallback();
    }, [navigate]);

    return (
        <div className="w-full h-screen flex items-center justify-center bg-white dark:bg-purple-950">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Connexion en cours...
                </h1>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            </div>
        </div>
    );
} 