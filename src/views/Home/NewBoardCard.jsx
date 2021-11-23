import { useState } from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Icon,
  Typography,
} from '@mui/material'
import BoardFormCard from './BoardFormCard'

const NewBoardCard = () => {
  const [editing, setEditing] = useState(false)

  const handleNewBoard = () => setEditing(true)

  if (editing) {
    return <BoardFormCard type='create' setEditing={setEditing} />
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <CardActionArea>
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
      </CardActionArea>
    </Grid>
  )
}

export default NewBoardCard
