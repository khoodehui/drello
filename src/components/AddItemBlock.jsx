import { Button, Card, CardContent, IconButton, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import useItemUtil from '../hooks/useItemUtil'
import useListUtil from '../hooks/useListUtil'

const AddItemBlock = ({ list }) => {
  const [isAdding, setIsAdding] = useState(false)
  const [content, setContent] = useState('')
  const { addItemToList } = useListUtil()
  const { createItem } = useItemUtil()

  const handleToggleAdd = () => setIsAdding(true)
  const handleContentChange = event => setContent(event.target.value)
  const isAddDisabled =
    list.items.length >= list.maxItems || content.trim().length === 0

  const handleKeyDown = event => {
    if (event.key === 'Enter' && !isAddDisabled) {
      addItem()
    } else if (event.key === 'Escape') {
      stopAdding()
    }
  }

  const handleOnBlur = () => {
    if (!isAddDisabled) {
      addItem()
    }
    setIsAdding(false)
  }

  const addItem = () => {
    addItemToList(list, createItem(content.trim()).id)
    setContent('')
  }

  const stopAdding = () => {
    setIsAdding(false)
    setContent('')
  }

  if (!isAdding) {
    return (
      <Button
        disabled={list.items.length >= list.maxItems}
        startIcon={<AddIcon />}
        onClick={handleToggleAdd}
        style={{ marginTop: 8 }}
      >
        New Item
      </Button>
    )
  }

  return (
    <>
      <Card variant='outlined' style={{ marginTop: 8, marginBottom: 8 }}>
        <CardContent>
          <TextField
            autoFocus
            placeholder='Item Content'
            value={content}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            onBlur={handleOnBlur}
          />
        </CardContent>
      </Card>
      <Button variant='contained' disabled={isAddDisabled} onClick={addItem}>
        Add Item
      </Button>
      <IconButton>
        <CloseIcon />
      </IconButton>
    </>
  )
}

export default AddItemBlock
