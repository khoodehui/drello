import React, { useState } from 'react'
import { Box, Button, IconButton, Paper, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import useCardUtil from '../../hooks/useCardUtil'
import useColumnUtil from '../../hooks/useColumnUtil'

const AddCardBlock = React.memo(({ column }) => {
  const [isAdding, setIsAdding] = useState(false)
  const [content, setContent] = useState('')
  const { addCardToColumn } = useColumnUtil()
  const { createCard } = useCardUtil()

  const handleToggleAdd = () => setIsAdding(true)
  const handleContentChange = event => setContent(event.target.value)
  const isAddDisabled =
    column.cards.length >= column.maxCards || content.trim().length === 0

  const stopAdding = () => {
    setIsAdding(false)
    setContent('')
  }

  const handleKeyDown = event => {
    // allows submit using shift + enter
    if (event.key === 'Enter' && !event.shiftKey && !isAddDisabled) {
      // prevent textfield focus loss
      event.preventDefault()
      addCard()
    } else if (event.key === 'Escape') {
      stopAdding()
    }
  }

  const handleOnBlur = () => {
    if (!isAddDisabled) {
      addCard()
    }
    stopAdding()
  }

  const addCard = () => {
    addCardToColumn(column, createCard(content.trim()).id)
    setContent('')
  }

  if (!isAdding) {
    return (
      <Button
        disabled={column.cards.length >= column.maxCards}
        startIcon={<AddIcon />}
        onClick={handleToggleAdd}
        sx={{ mt: 2 }}
      >
        New Card
      </Button>
    )
  }

  return (
    <Box>
      <Paper variant='outlined' sx={{ mt: 1, mb: 1, p: 1.5}}>
        <TextField
          autoFocus
          multiline
          placeholder='Card content'
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
        onClick={addCard}
      >
        Add Card
      </Button>
      <IconButton onMouseDown={e => e.preventDefault()} onClick={stopAdding}>
        <CloseIcon />
      </IconButton>
    </Box>
  )
})

export default AddCardBlock
