import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useDispatch } from 'react-redux'
import { newBoard, updateBoard } from '../reducers/boardsReducer'
import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
} from '@mui/material'
import { Box } from '@mui/system'

const BoardCardForm = props => {
  // if creating, use empty name and desc
  // if editing, use board's original name and desc
  const [name, setName] = useState(
    props.type === 'create' ? '' : props.board.name
  )
  const [desc, setDesc] = useState(
    props.type === 'create' ? '' : props.board.desc
  )

  const dispatch = useDispatch()

  const handleNameChange = event => setName(event.target.value)
  const handleDescChange = event => setDesc(event.target.value)

  const handleSubmit = event => {
    event.preventDefault()

    if (props.type === 'create') {
      const board = { id: uuid(), name, desc }
      dispatch(newBoard(board))
    } else {
      const board = { ...props.board, name, desc }
      dispatch(updateBoard(board))
    }

    props.setEditing(false)
  }

  // if creating, disable when no name is given
  // if editing, disable if no changes is made to name or desc
  const disableSubmit =
    props.type === 'create'
      ? name === ''
      : name === props.board.name && desc === props.board.desc

  const handleCancel = () => props.setEditing(false)

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card variant='outlined'>
        <CardContent>
          <Box component='form' onSubmit={handleSubmit}>
            <TextField
              id='name'
              placeholder='Board Name'
              variant='standard'
              autoFocus
              value={name}
              onChange={handleNameChange}
            />
            <TextField
              id='desc'
              placeholder='Description (optional)'
              variant='outlined'
              multiline
              value={desc}
              onChange={handleDescChange}
            />
            <Stack direction='row' spacing={2} justifyContent='stretch'>
              <Button
                type='submit'
                variant='contained'
                sx={{ flex: 1 }}
                disabled={disableSubmit}
              >
                {props.type === 'create' ? 'Create' : 'Save'}
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

export default BoardCardForm
