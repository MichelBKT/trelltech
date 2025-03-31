import PropTypes from 'prop-types';
import List from './List';
import CreateListForm from './CreateListForm';
import useFetchBoardData from "../../hooks/useFetchBoardData.jsx";
import { MenuContext } from "../MenuContext";
import { useContext } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { updateListsOrder, updateCardsOrder } from '../../api/trelloApi.js';

BoardView.propTypes = {
    boardId: PropTypes.string.isRequired,
};

export default function BoardView({ boardId }) {
    const { isMenuOpen } = useContext(MenuContext);
    const { lists, refreshData } = useFetchBoardData(boardId);

    const onDragEnd = async (result) => {
        const { destination, source, type } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (type === 'LIST') {
            const reorderedLists = Array.from(lists);
            const [movedList] = reorderedLists.splice(source.index, 1);
            reorderedLists.splice(destination.index, 0, movedList);

            try {
                await updateListsOrder(boardId, reorderedLists);
                refreshData();
            } catch (error) {
                console.error('Erreur lors de la mise à jour de l\'ordre des listes:', error);
            }
            return;
        }

        const startList = lists.find(list => list.id === source.droppableId);
        const endList = lists.find(list => list.id === destination.droppableId);

        if (!startList || !endList) return;

        if (startList.id === endList.id) {
            const reorderedCards = Array.from(startList.cards);
            const [movedCard] = reorderedCards.splice(source.index, 1);
            reorderedCards.splice(destination.index, 0, movedCard);

            try {
                await updateCardsOrder(startList.id, reorderedCards);
                refreshData();
            } catch (error) {
                console.error('Erreur lors de la mise à jour de l\'ordre des cartes:', error);
            }
        } else {
            const startCards = Array.from(startList.cards);
            const [movedCard] = startCards.splice(source.index, 1);
            const endCards = Array.from(endList.cards);
            endCards.splice(destination.index, 0, movedCard);

            try {
                await updateCardsOrder(startList.id, startCards);
                await updateCardsOrder(endList.id, endCards);
                refreshData();
            } catch (error) {
                console.error('Erreur lors de la mise à jour des cartes déplacées:', error);
            }
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
                droppableId="all-lists"
                direction="horizontal"
                type="LIST"
            >
                {(provided) => (
                    <div
                        className={`h-full relative ${isMenuOpen ? "left-72" : "left-32"} overflow-x-auto flex items-start space-x-4`}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {lists && lists.length > 0 ? (
                            lists.map((list, index) => (
                                <Draggable key={list.id} draggableId={list.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                        >
                                            <List
                                                list={list}
                                                onUpdate={refreshData}
                                                boardId={boardId}
                                                dragHandleProps={provided.dragHandleProps}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">Aucune liste trouvée. Créez-en une nouvelle.</p>
                        )}
                        {provided.placeholder}
                        <CreateListForm boardId={boardId} onListCreated={refreshData} />
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}