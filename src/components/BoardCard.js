import { useDispatch } from 'react-redux'
import { deleteBoard } from '../reducers/boardsReducer'
import { Button, Card, CardContent, Grid, Typography } from '@mui/material'

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
          <Grid container spacing={2} display='flex'>
            <Grid item xs={6} sx={{ flex: 1 }}>
              <Button variant='contained' color='primary' sx={{width: '100%'}}>
                Open
              </Button>
            </Grid>
            <Grid item xs={6} sx={{ flex: 1 }}>
              <Button
                variant='outlined'
                color='error'
                onClick={handleDeleteBoard}
                sx={{width: '100%'}}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default BoardCard
