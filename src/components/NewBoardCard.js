import { v4 as uuid } from 'uuid'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newBoard } from '../reducers/boardsReducer'
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Icon,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'

const NewBoardCard = () => {
  const [editing, setEditing] = useState(false)
  const [disableSubmit, setDisableSubmit] = useState(true)

  const dispatch = useDispatch()

  const handleNewBoard = () => setEditing(true)

  const handleToggleSubmitDisable = event => {
    const title = event.target.value
    if (title.length === 0) {
      setDisableSubmit(true)
    } else {
      setDisableSubmit(false)
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    const name = event.target.name.value
    const desc = event.target.desc.value
    const board = { id: uuid(), name, desc }
    dispatch(newBoard(board))
    setEditing(false)
  }

  const handleCancel = () => {
    setEditing(false)
    setDisableSubmit(true)
  }

  if (!editing) {
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

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card variant='outlined'>
        <CardContent>
          <Box component='form' onSubmit={handleSubmit}>
            <TextField
              id='name'
              label='Board Name'
              variant='standard'
              autoFocus
              onChange={handleToggleSubmitDisable}
            />
            <TextField
              id='desc'
              label='Description (optional)'
              variant='outlined'
              multiline
            />
            <Stack direction='row' spacing={2} justifyContent='stretch'>
              <Button
                type='submit'
                variant='contained'
                sx={{ flex: 1 }}
                disabled={disableSubmit}
              >
                Create
              </Button>
              <Button onClick={handleCancel} sx={{ flex: 1 }}>
                Cancel
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default NewBoardCard
