import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteBoard } from '../reducers/boardsReducer'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import MoreVert from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import BoardCardForm from './BoardCardForm'

const BoardCard = ({ board }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [menuAnchor, setMenuAnchor] = useState(null)
  const [showDialog, setShowDialog] = useState(false)
  const [editing, setEditing] = useState(false)
  const open = Boolean(menuAnchor)

  const handleOpenMenu = event => setMenuAnchor(event.currentTarget)
  const handleCloseMenu = () => setMenuAnchor(null)

  const handleEdit = () => {
    setMenuAnchor(null)
    setEditing(true)
  }

  const handleOpenBoard = () => navigate(`/${board.id}`)
  const handleDeleteBoard = () => {
    setMenuAnchor(null)
    setShowDialog(true)
  }

  const handleCloseDialog = () => setShowDialog(false)

  const handleDeleteConfirm = () => {
    setShowDialog(false)
    dispatch(deleteBoard(board.id))
  }

  if (editing) {
    return <BoardCardForm type='update' setEditing={setEditing} board={board} />
  }

  return (
    <>
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
              <MenuItem onClick={handleEdit}>
                <ListItemIcon>
                  <EditIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDeleteBoard}>
                <ListItemIcon>
                  <DeleteIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </Menu>
          </Stack>
          <Typography color='text.secondary'>{board.desc}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleOpenBoard}>Open</Button>
        </CardActions>
      </Card>
    </Grid>
    <Dialog open={showDialog} onClose={handleCloseDialog}>
      <DialogTitle>
        {`Delete ${board.name}`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleDeleteConfirm}>Delete</Button>
      </DialogActions>
    </Dialog>
    </>
  )
}

export default BoardCard
