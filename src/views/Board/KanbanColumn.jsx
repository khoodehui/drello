import React, { useState } from 'react'
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import MoreVert from '@mui/icons-material/MoreVert'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import EditableTypography from '../../components/EditableTypography'
import AddCardBlock from './AddCardBlock'
import KanbanCard from './KanbanCard'
import useColumnUtil from '../../hooks/useColumnUtil'
import useBoardUtil from '../../hooks/useBoardUtil'

const KanbanColumn = React.memo(({ columnId, index, board, isSrcDroppableSelf }) => {
  const { getColumnById, removeColumn, renameColumn, setColumnMaxCards } = useColumnUtil()
  const { removeColumnFromBoard } = useBoardUtil()
  const column = getColumnById(columnId)

  const [menuAnchor, setMenuAnchor] = useState(null)

  /* 
  Dropping for a column is clearly enabled if the number of cards in it is less than its card limit.
  However, if a column has max cards, we still want to allow cards to be dragged and dropped within it.
  Hence if the source column of the dragged card is itself, dropping is enabled for it.
  */
  const isDropDisabled = !(
    isSrcDroppableSelf || column.cards.length < column.maxCards
  )

  const handleOpenMenu = event => setMenuAnchor(event.currentTarget)
  const handleCloseMenu = () => setMenuAnchor(null)
  const isMenuOpen = Boolean(menuAnchor)

  const updateColumnName = value => {
    if (value.length > 0) {
      renameColumn(column, value)
    }
  }

  const updateMaxCards = value => {
    /*
    don't update if there is no input or input is not a number
    (since type of input field is set to number, non number inputs will return at an empty string)
    */
    if (value.length === 0) return

    const parsedValue = Number(value)
    // new max must be at least the number of cards in the column
    const newMax =
      parsedValue < column.cards.length ? column.cards.length : parsedValue
    setColumnMaxCards(column, newMax)
  }

  const deleteColumn = () => {
    removeColumn(column)
    removeColumnFromBoard(board, column.id)
  }

  return (
    <Draggable draggableId={column.id} index={index}>
      {provided => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
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
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            {...provided.dragHandleProps}
          >
            <EditableTypography
              inputType='text'
              typographyVariant='h5'
              typographyComponent='h2'
              fontWeight='medium'
              handleSaveChange={updateColumnName}
              otherTextFieldProps={{ sx: { mr: 2 } }}
              otherTypographyProps={{
                sx: { mr: 2, overflowX: 'scroll' },
                className: 'hideScrollbar',
              }}
            >
              {column.name}
            </EditableTypography>
            <Box display='flex' alignItems='center'>
              <Typography
                variant='h5'
                component='p'
                fontWeight={500}
                display='inline'
              >
                {`${column.cards.length}/`}
              </Typography>
              <EditableTypography
                inputType='number'
                typographyVariant='h5'
                typographyComponent='h2'
                fontWeight='medium'
                handleSaveChange={updateMaxCards}
                otherTextFieldProps={{
                  InputProps: {
                    inputProps: {
                      min: column.cards.length,
                    },
                    sx: { width: 50 },
                  },
                }}
              >
                {column.maxCards}
              </EditableTypography>
              <IconButton onClick={handleOpenMenu} sx={{ mr: -1 }}>
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={menuAnchor}
                open={isMenuOpen}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={deleteColumn}>Delete column</MenuItem>
              </Menu>
            </Box>
          </Stack>
          <Droppable
            droppableId={column.id}
            type='column'
            isDropDisabled={isDropDisabled}
          >
            {provided => (
              <Box
                /*
          the minHeight is to prevent the droppable from being 'disappearing' when the column has 
          no cards so that cards can still be dropped in the column
          */
                minHeight='1px'
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {column.cards.map((cardId, index) => (
                  <KanbanCard
                    key={cardId}
                    cardId={cardId}
                    index={index}
                    column={column}
                  />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
          <AddCardBlock column={column} />
        </Box>
      )}
    </Draggable>
  )
})

export default KanbanColumn
