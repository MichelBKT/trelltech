import {useEffect, useState} from "react";
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
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_287_5537)">
                                <g mask="url(#mask0_287_5537)">
                                    <path d="M17.562 0H2.43802C1.09153 0 0 1.09153 0 2.43802V17.562C0 18.9085 1.09153 20 2.43802 20H17.562C18.9085 20 20 18.9085 20 17.562V2.43802C20 1.09153 18.9085 0 17.562 0ZM8.7 15.5885C8.7 16.2139 8.19302 16.7208 7.56767 16.7208H3.73238C3.10698 16.7208 2.60005 16.2139 2.60005 15.5885V3.90233C2.60005 3.27693 3.10703 2.77 3.73238 2.77H7.56767C8.19307 2.77 8.7 3.27698 8.7 3.90233V15.5885ZM17.4 10.5612C17.4 11.1866 16.893 11.6935 16.2677 11.6935H12.4324C11.807 11.6935 11.3 11.1865 11.3 10.5612V3.90233C11.3 3.27693 11.807 2.77 12.4324 2.77H16.2677C16.8931 2.77 17.4 3.27698 17.4 3.90233V10.5612Z" fill="white"/>
                                </g>
                            </g>
                            <defs>
                                <clipPath id="clip0_287_5537">
                                    <rect width="20" height="20" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                        Se connecter avec Trello
                    </button>
                </div>
            </div>
        </div>
    );
}