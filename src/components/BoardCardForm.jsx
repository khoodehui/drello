import { useState } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
} from '@mui/material'
import { Box } from '@mui/system'
import useBoardUtil from '../hooks/useBoardUtil'
import { useNavigate } from 'react-router'

const BoardCardForm = props => {
  // if creating, use empty name and desc
  // if editing, use board's original name and desc
  const [name, setName] = useState(
    props.type === 'create' ? '' : props.board.name
  )
  const [desc, setDesc] = useState(
    props.type === 'create' ? '' : props.board.desc
  )

  const { createBoard, updateBoardInfo } = useBoardUtil()
  const navigate = useNavigate()

  const handleNameChange = event => setName(event.target.value)
  const handleDescChange = event => setDesc(event.target.value)

  const handleSubmit = event => {
    event.preventDefault()

    if (props.type === 'create') {
      const id = createBoard(name.trim(), desc.trim()).id
      navigate(`/${id}`)
    } else {
      updateBoardInfo(props.board, name.trim(), desc.trim())
    }

    props.setEditing(false)
  }

  // if creating, disable when no name is given
  // if editing, disable if no changes is made to name or desc
  const disableSubmit =
    props.type === 'create'
      ? name.trim() === ''
      : name.trim() === props.board.name && desc.trim() === props.board.desc

  const handleCancel = () => props.setEditing(false)

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <Box component='form' onSubmit={handleSubmit}>
          <CardContent>
            <TextField
              id='name'
              placeholder='Board Name'
              variant='standard'
              autoComplete='off'
              autoFocus
              value={name}
              onChange={handleNameChange}
              sx={{ paddingBottom: 2, width: '100%' }}
            />
            <TextField
              id='desc'
              placeholder='Description (optional)'
              variant='outlined'
              multiline
              size='small'
              value={desc}
              onChange={handleDescChange}
              sx={{ width: '100%' }}
            />
          </CardContent>
          <CardActions>
            <Button onClick={handleCancel} sx={{ width: '50%' }}>
              Cancel
            </Button>
            <Button
              type='submit'
              variant='contained'
              sx={{ width: '50%' }}
              disabled={disableSubmit}
            >
              {props.type === 'create' ? 'Create' : 'Save'}
            </Button>
          </CardActions>
        </Box>
      </Card>
    </Grid>
  )
}

export default BoardCardForm
