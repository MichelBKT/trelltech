import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Menu from "./components/Menu.jsx";
import { getBoards } from "./api/trelloApi.js";
import PropTypes from "prop-types";
import AppWelcome from "./components/AppWelcome.jsx";
import BoardView from "./components/board/BoardView.jsx";

export default function Home() {
    const [boards, setBoards] = useState([]);
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);
    const [workspaceColor, setWorkspaceColor] = useState(null);

    useEffect(() => {
        const fetchBoards = async () => {
            const fetchedBoards = await getBoards();
            setBoards(fetchedBoards);
        };
        fetchBoards().then();
    }, []);

    const handleWorkspaceSelect = (board) => {
        setSelectedWorkspace(board);
        setWorkspaceColor(board.prefs?.backgroundColor || "#ECB500");
    };

    return (
        <div className="flex h-screen bg-purple-100 dark:bg-purple-950">
            <Menu 
                boards={boards} 
                selectedWorkspace={selectedWorkspace} 
                onWorkspaceSelect={handleWorkspaceSelect}
            />
            <div className="flex-1 flex flex-col">
                <Navbar 
                    selectedWorkspace={selectedWorkspace} 
                    workspaceColor={workspaceColor}
                />
                <div className="flex flex-col w-full h-full overflow-hidden">
                    {selectedWorkspace ? (
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                                {selectedWorkspace.name}
                            </h1>
                                <BoardView
                                    boardId={selectedWorkspace.id}
                                    backgroundColor={workspaceColor}
                                />
                        </div>
                    ) : (
                        <AppWelcome />
                    )}
                </div>
            </div>
        </div>
    );
}

Home.propTypes = {
    boards: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        prefs: PropTypes.shape({
            backgroundColor: PropTypes.string
        })
    })),
    selectedWorkspace: PropTypes.object,
    workspaceColor: PropTypes.string
}; 