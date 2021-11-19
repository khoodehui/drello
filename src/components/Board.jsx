import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BoardList from './BoardList'
import { DragDropContext } from 'react-beautiful-dnd'
import { Container, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import useBoardUtil from '../hooks/useBoardUtil'

const Board = () => {
  const id = useParams().id
  const { getBoardById } = useBoardUtil()
  const board = getBoardById(id)

  if (!board) {
    return null
  }

  const onDragEnd = result => {
    const { source, destination, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
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
