import PropTypes from 'prop-types';
import List from './List';
import CreateListForm from './CreateListForm';
import useFetchBoardData from "../../hooks/useFetchBoardData.jsx";
import { MenuContext } from "../MenuContext";
import { useContext, useState, useCallback, useEffect } from "react";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {updateListsOrder, updateCardPosition} from '../../api/trelloApi.js';

BoardView.propTypes = {
    boardId: PropTypes.string.isRequired,
};

export default function BoardView({ boardId }) {
    const { isMenuOpen } = useContext(MenuContext);
    const { lists, refreshData } = useFetchBoardData(boardId);
    const [isDragging, setIsDragging] = useState(false);
    const [localLists, setLocalLists] = useState(lists);

    // Mise à jour des listes locales quand les listes du serveur changent
    useEffect(() => {
        setLocalLists(lists);
    }, [lists]);

    const onDragStart = useCallback(() => {
        setIsDragging(true);
    }, []);

    const onDragEnd = useCallback(async (result) => {
        setIsDragging(false);
        const {destination, source, type} = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // Mise à jour optimiste de l'interface
        const updatedLists = [...localLists];
        
        if (type === 'LIST') {
            const [movedList] = updatedLists.splice(source.index, 1);
            updatedLists.splice(destination.index, 0, movedList);
        } else {
            const startList = updatedLists.find(list => list.id === source.droppableId);
            const endList = updatedLists.find(list => list.id === destination.droppableId);
            
            if (startList.id === endList.id) {
                const reorderedCards = Array.from(startList.cards);
                const [movedCard] = reorderedCards.splice(source.index, 1);
                reorderedCards.splice(destination.index, 0, movedCard);
                startList.cards = reorderedCards;
            } else {
                const startCards = Array.from(startList.cards);
                const [movedCard] = startCards.splice(source.index, 1);
                const endCards = Array.from(endList.cards);
                endCards.splice(destination.index, 0, movedCard);
                startList.cards = startCards;
                endList.cards = endCards;
            }
        }

        // Mise à jour immédiate de l'état local
        setLocalLists(updatedLists);

        try {
            if (type === 'LIST') {
                await updateListsOrder(boardId, updatedLists);
            } else {
                const startList = updatedLists.find(list => list.id === source.droppableId);
                const endList = updatedLists.find(list => list.id === destination.droppableId);
                
                if (startList.id === endList.id) {
                    await Promise.all(
                        startList.cards.map((card, index) =>
                            updateCardPosition(card.id, index + 1)
                        )
                    );
                } else {
                    await Promise.all([
                        ...startList.cards.map((card, index) =>
                            updateCardPosition(card.id, index + 1)
                        ),
                        ...endList.cards.map((card, index) =>
                            updateCardPosition(card.id, index + 1, endList.id)
                        )
                    ]);
                }
            }
            // Rafraîchir les données après la mise à jour réussie
            refreshData();
        } catch (error) {
            console.error("Erreur lors de la mise à jour:", error);
            // En cas d'erreur, on rafraîchit les données depuis le serveur
            refreshData();
        }
    }, [localLists, boardId, refreshData]);

    return (
        <div className={`flex-1 overflow-x-hidden p-4 ${isMenuOpen ? 'ml-64' : 'ml-24'}`}>
            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <Droppable droppableId="board" type="LIST" direction="horizontal" isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false}>
                    {(provided) => (
                        <div
                            className={`flex gap-4 transition-opacity duration-200 ${isDragging ? 'opacity-90' : 'opacity-100'}`}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{ overflowX: 'auto', paddingBottom: '8px' }}
                        >
                            {localLists.map((list, index) => (
                                <List
                                    key={list.id}
                                    list={list}
                                    onUpdate={refreshData}
                                    index={index}
                                    boardId={boardId}
                                    type="LIST"
                                    isDragging={isDragging}
                                />
                            ))}
                            {provided.placeholder}
                            <CreateListForm boardId={boardId} onListCreated={refreshData} />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}