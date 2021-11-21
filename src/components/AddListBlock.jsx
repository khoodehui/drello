import {
  Box,
  Button,
  CardActionArea,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import useListUtil from '../hooks/useListUtil'
import { useState } from 'react'
import useBoardUtil from '../hooks/useBoardUtil'

const AddListBlock = ({ board }) => {
  const [isAdding, setIsAdding] = useState(false)
  const [listName, setListName] = useState('')
  const { createList } = useListUtil()
  const { addListToBoard } = useBoardUtil()

  const handleToggleAdd = () => setIsAdding(true)
  const handleListNameChange = event => setListName(event.target.value)
  const isAddDisabled = listName.trim().length === 0

  const stopAdding = () => {
    setIsAdding(false)
    setListName('')
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter' && !isAddDisabled) {
      addList()
    } else if (event.key === 'Escape') {
      stopAdding()
    }
  }

  const handleOnBlur = () => {
    stopAdding()
  }

  const addList = () => {
    addListToBoard(board, createList(listName.trim()).id)
    stopAdding()
  }

  if (!isAdding) {
    return (
      <CardActionArea
        elevation='0'
        sx={{
          display: 'inline-block',
          backgroundColor: theme => theme.palette.grey[100],
          p: 2,
          ml: 2,
          verticalAlign: 'top',
          width: 332,
          maxWidth: 0.75,
        }}
        onClick={handleToggleAdd}
      >
        <Box display='flex' alignItems='center'>
          <AddIcon fontSize='small' sx={{ mr: 1 }} />
          <Typography variant='button'>New List</Typography>
        </Box>
      </CardActionArea>
    )
  }

  return (
    <Box
      sx={{
        backgroundColor: theme => theme.palette.grey[100],
        display: 'inline-block',
        p: 2,
        ml: 2,
        verticalAlign: 'top',
        width: 300,
        maxWidth: 0.75,
      }}
    >
      <Box sx={{ mb: 1 }}>
        <TextField
          variant='outlined'
          autoFocus
          placeholder='List name'
          value={listName}
          onChange={handleListNameChange}
          onKeyDown={handleKeyDown}
          onBlur={handleOnBlur}
          sx={{backgroundColor: 'white', width: 1}}
        />
      </Box>
      <Button
        variant='contained'
        onMouseDown={e => e.preventDefault()}
        disabled={isAddDisabled}
        onClick={addList}
      >
        Add List
      </Button>
      <IconButton onMouseDown={e => e.preventDefault()} onClick={stopAdding}>
        <CloseIcon />
      </IconButton>
    </Box>
  )
}

export default AddListBlock
