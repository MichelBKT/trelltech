import PropTypes from 'prop-types';
import List from './List';
import CreateListForm from './CreateListForm';
import useFetchBoardData from "../../hooks/useFetchBoardData.jsx";
import { MenuContext } from "../MenuContext";
import {useContext} from "react";

BoardView.propTypes = {
    boardId: PropTypes.string,
    backgroundColor: PropTypes.string,
};

export default function BoardView({ boardId}) {
    const {isMenuOpen} = useContext(MenuContext);
    useFetchBoardData(boardId);
    const { lists } = useFetchBoardData(boardId);


    return (
        <div
            className={`h-full relative ${isMenuOpen ? "left-72" : "left-32"} overflow-x-auto flex items-start space-x-4`}
        >
            {lists.map((list) => (
                <List
                    key={list.id}
                    list={list}
                    onUpdate={() => useFetchBoardData}
                    boardId={boardId}
                />
            ))}
            <CreateListForm boardId={boardId} onListCreated={() => useFetchBoardData} />
        </div>
    );
}