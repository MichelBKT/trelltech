import './App.css';
import BoardComponent from "./components/BoardComponent.jsx";

const env = {
    apiUrl: import.meta.env.TRELLO_API_URL,
    apiKey: import.meta.env.TRELLO_API_KEY,
    apiToken: import.meta.env.TRELLO_API_TOKEN,
};

export default function App() {

  return (
    <>
        <h1 className={"bg-blue-800 text-white font-bold w-full h-24 content-center"}>TrellTech Bienvenue ! Bg bleu centrer tailwind ok à supp</h1>
        <BoardComponent />
    </>
  )
}

export {env};
