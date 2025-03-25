import { useState } from "react";
import Cookies from "js-cookie";
import BrandWhiteIcon from "../src/components/icons/BrandWhiteIcon";
import BrandIcon from "../src/components/icons/BrandIcon";
import ToggleOnDarkMode from "../src/components/icons/ToggleOnDarkMode.jsx";
import ToggleOffDarkMode from "../src/components/icons/ToggleOffDarkMode.jsx";

export default function Login() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (Cookies.get('dark') === 'true') {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        }
    }, []);



    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        if (newDarkMode) {
            document.documentElement.classList.add('dark');
            Cookies.set('dark', 'true', { expires: 365 });
        } else {
            document.documentElement.classList.remove('dark');
            Cookies.set('dark', 'false', { expires: 365 });
        }
    };

    const handleTrelloLogin = () => {
        const REDIRECT_URI = 'http://localhost:5173/callback';
        const SCOPE = 'read,write,account';
        
        const authUrl = `https://trello.com/1/authorize?response_type=token&key=${import.meta.env.VITE_TRELLO_API_KEY}&return_url=${REDIRECT_URI}&scope=${SCOPE}&expiration=never&name=Agilix`;
        
        window.location.href = authUrl;
    };

    return (
        <div className="w-full h-screen block items-center justify-center bg-white dark:bg-purple-950">
            <div className="w-full flex px-12 py-4 space-x-0 items-center justify-between">
                <div className="inline-flex font-extrabold text-4xl bg-gradient-to-b dark:text-white from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    <BrandIcon />
                    <BrandWhiteIcon />
                    AGILIX
                </div>
                <div>
                    <button onClick={toggleDarkMode} className="">
                        {darkMode ? <ToggleOnDarkMode /> : <ToggleOffDarkMode />}
                    </button>
                </div>
            </div>
            <div className="w-full mt-24 absolute inline-flex flex-col justify-center items-center gap-4">
                <div className="w-full self-stretch inline-flex flex-col justify-start items-center gap-2">
                    <h1 className="justify-center text-slate-800 dark:text-white text-3xl font-bold font-['Nunito'] leading-10">
                        Connexion
                    </h1>
                    <p className="opacity-60 text-center justify-start text-slate-800 dark:text-white text-base font-normal font-['Nunito'] leading-loose">
                        Connectez-vous avec votre compte Trello pour continuer
                    </p>
                </div>
                <div className="relative my-4 w-xs">
                    <button 
                        onClick={handleTrelloLogin}
                        className="btn w-full relative overflow-hidden h-10 p-3 bg-[#0079BF] rounded-[400px] inline-flex justify-center items-center gap-2.5 text-white cursor-pointer hover:bg-[#026AA7] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5C6.21 22.5 1.5 17.79 1.5 12S6.21 1.5 12 1.5 22.5 6.21 22.5 12 17.79 22.5 12 22.5z"/>
                            <path d="M12 6.5c-3.038 0-5.5 2.462-5.5 5.5s2.462 5.5 5.5 5.5 5.5-2.462 5.5-5.5-2.462-5.5-5.5-5.5zm0 9c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z"/>
                        </svg>
                        Se connecter avec Trello
                    </button>
                </div>
            </div>
        </div>
    );
}