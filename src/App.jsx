import './App.css';
import Menu from "./components/Menu.jsx";

//
// const env = {
//     apiUrl: import.meta.env.TRELLO_API_URL,
//     apiKey: import.meta.env.TRELLO_API_KEY,
//     apiToken: import.meta.env.TRELLO_API_TOKEN,
// };

export default function App() {

  return (
    <div className={"flex w-full h-full "}>
        <Menu/>
    </div>
  )
}

//export {env};
