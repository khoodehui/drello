import { Box, Button, IconButton, Paper, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import React, { useState } from 'react'
import useItemUtil from '../hooks/useItemUtil'
import useListUtil from '../hooks/useListUtil'

const AddItemBlock = React.memo(({ list }) => {
  const [isAdding, setIsAdding] = useState(false)
  const [content, setContent] = useState('')
  const { addItemToList } = useListUtil()
  const { createItem } = useItemUtil()

  const handleToggleAdd = () => setIsAdding(true)
  const handleContentChange = event => setContent(event.target.value)
  const isAddDisabled =
    list.items.length >= list.maxItems || content.trim().length === 0

  const stopAdding = () => {
    setIsAdding(false)
    setContent('')
  }

  const handleKeyDown = event => {
    // allows submit using shift + enter
    if (event.key === 'Enter' && !event.shiftKey && !isAddDisabled) {
      // prevent textfield focus loss
      event.preventDefault()
      addItem()
    } else if (event.key === 'Escape') {
      stopAdding()
    }
  }

  const handleOnBlur = () => {
    if (!isAddDisabled) {
      addItem()
    }
    stopAdding()
  }

  const addItem = () => {
    addItemToList(list, createItem(content.trim()).id)
    setContent('')
  }

  if (!isAdding) {
    return (
      <Button
        disabled={list.items.length >= list.maxItems}
        startIcon={<AddIcon />}
        onClick={handleToggleAdd}
        sx={{ mt: 2 }}
      >
        New Item
      </Button>
    )
  }

  return (
    <Box>
      <Paper variant='outlined' sx={{ mt: 1, mb: 1, p: 1.5}}>
        <TextField
          autoFocus
          multiline
          placeholder='Item content'
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
          onBlur={handleOnBlur}
          sx={{width: 1}}
        />
      </Paper>
      <Button
        variant='contained'
        disabled={isAddDisabled}
        // prevents textfield from losing focus when button is pressed
        onMouseDown={e => e.preventDefault()}
        onClick={addItem}
      >
        Add Item
      </Button>
      <IconButton onMouseDown={e => e.preventDefault()} onClick={stopAdding}>
        <CloseIcon />
      </IconButton>
    </Box>
  )
})

export default AddItemBlock
