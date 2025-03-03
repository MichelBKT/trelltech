import './App.css';
import Menu from "./components/Menu.jsx";
import Navbar from "./components/Navbar.jsx";
import MainApp from "./components/MainApp.jsx";

//
// const env = {
//     apiUrl: import.meta.env.TRELLO_API_URL,
//     apiKey: import.meta.env.TRELLO_API_KEY,
//     apiToken: import.meta.env.TRELLO_API_TOKEN,
// };

export default function App() {

  return (
      <>
          <div className="relative h-screen">
              <Menu className="z-50" />
              <div className="flex flex-col h-full">
                  <Navbar className="z-10"/>
                  <MainApp />
              </div>
          </div>
      </>




  )
}

//export {env};
