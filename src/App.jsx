import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./Home.jsx";
import Callback from "./Callback.jsx";
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
                    <Route path="/callback" element={<Callback/>} />
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path ="/home" element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </MenuProvider>
    );
}

//export {env};
