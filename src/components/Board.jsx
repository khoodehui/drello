import { useParams } from 'react-router-dom'
import BoardList from './BoardList'
import { DragDropContext } from 'react-beautiful-dnd'
import { Container, Typography } from '@mui/material'
import useBoardUtil from '../hooks/useBoardUtil'
import useListUtil from '../hooks/useListUtil'

const Board = () => {
  const id = useParams().id
  const { getBoardById } = useBoardUtil()
  const { getListById, swapItemsInList, swapItemBetweenLists } = useListUtil()
  const board = getBoardById(id)

  if (!board) {
    return null
  }

  const onDragEnd = result => {
    const { source, destination } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    if (destination.droppableId === source.droppableId) {
      swapItemsInList(getListById(destination.droppableId), source.index, destination.index)
    } else {
      swapItemBetweenLists(getListById(source.droppableId), getListById(destination.droppableId), source.index, destination.index)
    }

  }

  return (
    <Container maxWidth='lg'>
      <Typography variant='h4' component='h1'>
        {board.name}
      </Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        {board.lists.map(listId => (
          <BoardList key={listId} listId={listId} />
        ))}
      </DragDropContext>
    </Container>
  )
}

export default Board
