import './App.css';
import {BrowserRouter, Route, Routes} from "react-router";
import Login from "./Login.jsx";
import WelcomeScreen from "./components/WelcomeScreen.jsx";
import Callback from "./Callback.jsx";

//
// const env = {
//     apiUrl: import.meta.env.TRELLO_API_URL,
//     apiKey: import.meta.env.TRELLO_API_KEY,
//     apiToken: import.meta.env.TRELLO_API_TOKEN,
// };

export default function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/" element={<Login/>} />
                <Route path="/home" element={<WelcomeScreen />} />
                <Route path="/callback" element={<Callback />} />
            </Routes>
        </BrowserRouter>
    );
}

//export {env};
