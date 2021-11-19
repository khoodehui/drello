import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BoardList from './BoardList'
import { DragDropContext } from 'react-beautiful-dnd'
import { Container, Typography } from '@mui/material'

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
    <Container maxWidth='lg'>
    <Typography variant='h4' component='h1'>{board.name}</Typography>
    <DragDropContext onDragEnd={onDragEnd}>
      {board.lists.map(list => (
        <BoardList key={list.id} list={list} />
      ))}
    </DragDropContext>
    </Container>
  )
}

export default Board
