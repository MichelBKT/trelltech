import PropTypes from 'prop-types';
import List from './List';
import CreateListForm from './CreateListForm';
import useFetchBoardData from "../../hooks/useFetchBoardData.jsx";
import { MenuContext } from "../MenuContext";
import { useContext } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {updateListsOrder, updateCardPosition} from '../../api/trelloApi.js';

BoardView.propTypes = {
    boardId: PropTypes.string.isRequired,
};

export default function BoardView({ boardId }) {
    const { isMenuOpen } = useContext(MenuContext);
    const { lists, refreshData } = useFetchBoardData(boardId);

    const onDragEnd = async (result) => {
        const {destination, source, type} = result;

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

        if (startList.id === endList.id) {
            const reorderedCards = Array.from(startList.cards);
            const [movedCard] = reorderedCards.splice(source.index, 1);
            reorderedCards.splice(destination.index, 0, movedCard);

            try {
                // Met à jour la position de chaque carte dans la liste
                await Promise.all(
                    reorderedCards.map((card, index) =>
                        updateCardPosition(card.id, index + 1)
                    )
                );
                refreshData();
            } catch (error) {
                console.error("Erreur lors de la mise à jour de l'ordre des cartes:", error);
            }
        } else {
            // Pour un déplacement entre listes, mettre à jour la carte déplacée avec la nouvelle liste
            const startCards = Array.from(startList.cards);
            const [movedCard] = startCards.splice(source.index, 1);
            const endCards = Array.from(endList.cards);
            endCards.splice(destination.index, 0, movedCard);

            try {
                // Met à jour les positions dans la liste source
                await Promise.all(
                    startCards.map((card, index) =>
                        updateCardPosition(card.id, index + 1)
                    )
                );
                // Et la carte déplacée et les cartes de destination
                await Promise.all(
                    endCards.map((card, index) =>
                        updateCardPosition(card.id, index + 1, endList.id)
                    )
                );
                refreshData();
            } catch (error) {
                console.error("Erreur lors de la mise à jour des cartes déplacées:", error);
            }
        }


    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={`h-full relative ${isMenuOpen ? "left-72" : "left-32"} overflow-x-auto p-4`}>
                <Droppable droppableId="all-lists" direction="horizontal" type="LIST" isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false}>
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="flex items-start space-x-4"
                        >
                            {lists.map((list, index) => (
                                <List
                                    key={list.id}
                                    list={list}
                                    index={index} // bien transmettre l'index
                                    onUpdate={refreshData}
                                />
                            ))}
                            {provided.placeholder} {/* Important */}
                            <CreateListForm boardId={boardId} onListCreated={refreshData} />
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
}