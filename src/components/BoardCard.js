import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteBoard } from '../reducers/boardsReducer'
import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material'

const BoardCard = ({ board }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleOpenBoard = () => navigate(`/${board.id}`)

  const handleDeleteBoard = () => dispatch(deleteBoard(board.id))

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card variant='outlined'>
        <CardContent>
          <Typography variant='h5' component='h2'>
            {board.name}
          </Typography>
          <Typography color='text.secondary'>{board.desc}</Typography>
          <Stack direction='row' spacing={2} justifyContent='stretch'>
            <Button
              variant='contained'
              color='primary'
              onClick={handleOpenBoard}
              sx={{ flex: 1 }}
            >
              Open
            </Button>
            <Button
              variant='outlined'
              color='error'
              onClick={handleDeleteBoard}
              sx={{ flex: 1 }}
            >
              Delete
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default BoardCard
