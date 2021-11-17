import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteBoard } from '../reducers/boardsReducer'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import { useState } from 'react'
import BoardCardForm from './BoardCardForm'

const BoardCard = ({ board }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [menuAnchor, setMenuAnchor] = useState(null)
  const [editing, setEditing] = useState(false)
  const open = Boolean(menuAnchor)

  const handleOpenMenu = event => setMenuAnchor(event.currentTarget)
  const handleCloseMenu = () => setMenuAnchor(null)

  const handleEdit = () => {
    setEditing(true)
    setMenuAnchor(null)
  }

  const handleOpenBoard = () => navigate(`/${board.id}`)
  const handleDeleteBoard = () => dispatch(deleteBoard(board.id))

  if (editing) {
    return <BoardCardForm type='update' setEditing={setEditing} board={board} />
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card variant='outlined'>
        <CardContent>
          <Stack direction='row' justifyContent='space-between'>
            <Typography variant='h5' component='h2'>
              {board.name}
            </Typography>
            <IconButton onClick={handleOpenMenu}>
              <MoreVert />
            </IconButton>
            <Menu anchorEl={menuAnchor} open={open} onClose={handleCloseMenu}>
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDeleteBoard}>Delete</MenuItem>
            </Menu>
          </Stack>
          <Typography color='text.secondary'>{board.desc}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleOpenBoard}>Open</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default BoardCard
