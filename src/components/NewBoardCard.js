import { v4 as uuid } from 'uuid'
import { useDispatch } from 'react-redux'
import { newBoard } from '../reducers/boardsReducer'
import { Card, CardContent, Grid, Icon, Typography } from '@mui/material'

const NewBoardCard = () => {
  const dispatch = useDispatch()

  const handleNewBoard = () => {
    const board = {
      id: uuid(),
      name: 'New Board',
      desc: 'Board Desc',
    }
    dispatch(newBoard(board))
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        variant='outlined'
        onClick={handleNewBoard}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',  
        }}
      >
        <CardContent>
          <Icon color='primary' sx={{ fontSize: 60, width: '100%' }}>
            add_circle
          </Icon>
          <Typography color='text.secondary'>New Board</Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default NewBoardCard
