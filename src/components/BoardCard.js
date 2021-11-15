import { useDispatch } from 'react-redux'
import { deleteBoard } from '../reducers/boardsReducer'
import { Button, Card, Typography, CardContent } from '@mui/material'

const BoardCard = ({ board }) => {
  const dispatch = useDispatch()

  const handleDeleteBoard = () => dispatch(deleteBoard(board.id))

  return (
    <Card variant='outlined'>
      <CardContent>
        <h2>{board.name}</h2>
        <p>{board.desc}</p>
        <Button variant='outlined' onClick={handleDeleteBoard}>
          Delete Board
        </Button>
      </CardContent>
    </Card>
  )
}

export default BoardCard
