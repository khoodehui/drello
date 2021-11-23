import React, { useState } from 'react'
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
import useColumnUtil from '../../hooks/useColumnUtil'
import useBoardUtil from '../../hooks/useBoardUtil'

const AddColumnBlock = React.memo(({ board }) => {
  const [isAdding, setIsAdding] = useState(false)
  const [columnName, setColumnName] = useState('')
  const { createColumn } = useColumnUtil()
  const { addColumnToBoard } = useBoardUtil()

  const handleToggleAdd = () => setIsAdding(true)
  const handleColumnNameChange = event => setColumnName(event.target.value)
  const isAddDisabled = columnName.trim().length === 0

  const stopAdding = () => {
    setIsAdding(false)
    setColumnName('')
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter' && !isAddDisabled) {
      addColumn()
    } else if (event.key === 'Escape') {
      stopAdding()
    }
  }

  const handleOnBlur = () => {
    stopAdding()
  }

  const addColumn = () => {
    addColumnToBoard(board, createColumn(columnName.trim()).id)
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
          width: 407,
          maxWidth: 0.75,
        }}
        onClick={handleToggleAdd}
      >
        <Box display='flex' alignItems='center'>
          <AddIcon fontSize='small' sx={{ mr: 1 }} />
          <Typography variant='button'>New Column</Typography>
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
        width: 375,
        maxWidth: 0.75,
      }}
    >
      <Box sx={{ mb: 1 }}>
        <TextField
          variant='outlined'
          autoFocus
          placeholder='Column name'
          value={columnName}
          onChange={handleColumnNameChange}
          onKeyDown={handleKeyDown}
          onBlur={handleOnBlur}
          sx={{backgroundColor: 'white', width: 1}}
        />
      </Box>
      <Button
        variant='contained'
        onMouseDown={e => e.preventDefault()}
        disabled={isAddDisabled}
        onClick={addColumn}
      >
        Add Column
      </Button>
      <IconButton onMouseDown={e => e.preventDefault()} onClick={stopAdding}>
        <CloseIcon />
      </IconButton>
    </Box>
  )
})

export default AddColumnBlock
