import PropTypes from 'prop-types';
import List from './List';
import CreateListForm from './CreateListForm';
import useFetchBoardData from "../../hooks/useFetchBoardData.jsx";
import { MenuContext } from "../MenuContext";
import { useContext } from "react";

BoardView.propTypes = {
    boardId: PropTypes.string.isRequired,
};

export default function BoardView({ boardId }) {
    const { isMenuOpen } = useContext(MenuContext);
    const { lists, refreshData } = useFetchBoardData(boardId);

    return (
        <div className={`h-full relative ${isMenuOpen ? "left-72" : "left-32"} overflow-x-auto flex items-start space-x-4`}>
            {lists && lists.length > 0 ? (
                lists.map((list) => (
                    <List
                        key={list.id}
                        list={list}
                        onUpdate={refreshData}
                        boardId={boardId}
                    />
                ))
            ) : (
                <p className="text-gray-500 dark:text-gray-400">Aucune liste trouvée. Créez-en une nouvelle.</p>
            )}
            <CreateListForm boardId={boardId} onListCreated={refreshData} />
        </div>
    );
}
