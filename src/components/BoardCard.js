import { useDispatch } from 'react-redux'
import { deleteBoard } from '../reducers/boardsReducer'
import { Button, Card, CardContent, Grid, Typography} from '@mui/material'

const BoardCard = ({ board }) => {
  const dispatch = useDispatch()

  const handleDeleteBoard = () => dispatch(deleteBoard(board.id))

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card variant='outlined'>
        <CardContent>
          <Typography variant='h5' component='h2'>
            {board.name}
          </Typography>
          <Typography color='text.secondary'>{board.desc}</Typography>
          <Button variant='outlined' onClick={handleDeleteBoard}>
            Delete Board
          </Button>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default BoardCard
