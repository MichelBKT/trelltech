import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import BrandWhiteIcon from "../src/components/icons/BrandWhiteIcon";
import ToggleOnDarkMode from "../src/components/icons/ToggleOnDarkMode.jsx";
import ToggleOffDarkMode from "../src/components/icons/ToggleOffDarkMode.jsx";



export default function Login() {
    const [darkMode, setDarkMode] = useState(false);

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


    return (
        <div className="w-full h-screen block items-center justify-center bg-white">
            <div className="w-full flex space-x-0 items-center justify-between">

                <div className="">
                    <BrandWhiteIcon className="w-16 h-16" />

                </div>
                <div>
                    <button onClick={toggleDarkMode} className="">
                        {darkMode ? <ToggleOnDarkMode /> : <ToggleOffDarkMode />}
                    </button>
                </div>

            </div>
            <div className="w-full left-[auto] top-[20%] absolute inline-flex flex-col justify-center items-center gap-4">
                <div className="w-full self-stretch inline-flex flex-col justify-start items-center gap-2">
                    <h1 className="justify-center text-slate-800 text-3xl font-bold font-['Nunito'] leading-10"> Connexion </h1>
                    <p className="opacity-60 text-center justify-start text-slate-800 text-base font-normal font-['Nunito'] leading-loose">Veuillez vous connecter pour continuer avec votre compte</p>
                </div>
                <div>
                    <div className="relative my-4 w-xs">
                        <label className="block justify-start text-slate-800 text-xs font-semibold font-['Nunito'] leading-snug" htmlFor="">Email</label>
                        <input className="block w-full self-stretch text-slate-800 opacity-100 px-4 py-2.5 bg-purple-100 rounded-[10px] inline-flex justify-start items-center gap-2.5" type="email" placeholder="user@domaine.com" />
                    </div>
                    <div className="relative my-4 w-xs">
                        <label className="block justify-start text-slate-800 text-xs font-semibold font-['Nunito'] leading-snug" htmlFor="">Mot de passe</label>
                        <input className="block w-full self-stretch text-slate-800 opacity-100 px-4 py-2.5 bg-purple-100 rounded-[10px] inline-flex justify-start items-center gap-2.5" type="email" placeholder="****************" />
                    </div>

                    <div className="relative my-4 w-xs">
                        <div className="inline-flex justify-start items-center gap-2.5">
                            <input type="checkbox" name="" id="" />
                            <label htmlFor="Rester connecté" className="opacity-90 text-center justify-start text-slate-800 text-base font-normal font-['Nunito'] leading-snug">Rester connecté</label>
                        </div>
                    </div>
                    <div className="relative my-4 w-xs">
                        <button className="w-full self-stretch h-10 p-3 bg-purple-600 rounded-[400px] inline-flex justify-center items-center gap-2.5 text-white"> Connexion </button>
                    </div>
                </div>
                <div>
                    <span>Mot de passe oubliée ?</span>
                </div>
            </div>

        </div>

    );


}