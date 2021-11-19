import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BoardList from './BoardList'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const Board = () => {
  const id = useParams().id
  const board = useSelector(state =>
    state.boards.find(board => board.id === id)
  )

  if (!board) {
    return null
  }

  const onDragEnd = result => {}

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {board.lists.map(list => (
        <BoardList key={list.id} list={list} />
      ))}
    </DragDropContext>
  )
}

export default Board
