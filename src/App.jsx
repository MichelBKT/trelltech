import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login.jsx";
import WelcomeScreen from "./components/WelcomeScreen.jsx";
import {MenuProvider} from "./components/MenuContext.jsx";
import Home from "./Home.jsx";
import Callback from "./Callback.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import WelcomeScreen from "./components/WelcomeScreen.jsx";
import {MenuProvider} from "./components/MenuContext.jsx";

//
// const env = {
//     apiUrl: import.meta.env.TRELLO_API_URL,
//     apiKey: import.meta.env.TRELLO_API_KEY,
//     apiToken: import.meta.env.TRELLO_API_TOKEN,
// };

export default function App() {
    return (
        <MenuProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/" element={<Login/>} />
                    <Route path="/home" element={
                        <ProtectedRoute>
                            <WelcomeScreen />
                        </ProtectedRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </MenuProvider>
    );
}

//export {env};
