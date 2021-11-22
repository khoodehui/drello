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
import BoardListItem from './BoardListItem'
import useListUtil from '../hooks/useListUtil'
import EditableTypography from './EditableTypography'
import AddItemBlock from './AddItemBlock'
import React, { useState } from 'react'
import useBoardUtil from '../hooks/useBoardUtil'

const BoardList = React.memo(({ listId, index, board, isSrcDroppableSelf }) => {
  const { getListById, removeList, renameList, setListMaxItems } = useListUtil()
  const { removeListFromBoard } = useBoardUtil()
  const list = getListById(listId)

  const [menuAnchor, setMenuAnchor] = useState(null)

  /* 
  Dropping for a list is clearly enabled if the number of items in it is less than its item limit.
  However, if a list has max items, we still want to allow items to be dragged and dropped within it.
  Hence if the source list of the dragged item is itself, dropping is enabled for it.
  */
  const isDropDisabled = !(
    isSrcDroppableSelf || list.items.length < list.maxItems
  )

  const handleOpenMenu = event => setMenuAnchor(event.currentTarget)
  const handleCloseMenu = () => setMenuAnchor(null)
  const isMenuOpen = Boolean(menuAnchor)

  const updateListName = value => {
    if (value.length > 0) {
      renameList(list, value)
    }
  }

  const updateMaxItems = value => {
    /*
    don't update if there is no input or input is not a number
    (since type of input field is set to number, non number inputs will return at an empty string)
    */
    if (value.length === 0) return

    const parsedValue = Number(value)
    // new max must be at least the number of items in the list
    const newMax =
      parsedValue < list.items.length ? list.items.length : parsedValue
    setListMaxItems(list, newMax)
  }

  const deleteList = () => {
    removeList(list)
    removeListFromBoard(board, list.id)
  }

  return (
    <Draggable draggableId={list.id} index={index}>
      {provided => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          sx={{
            backgroundColor: theme => theme.palette.grey[100],
            display: 'inline-block',
            p: 2,
            ml: 2,
            mb: 2,
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
              handleSaveChange={updateListName}
              otherTextFieldProps={{ sx: { mr: 2 } }}
              otherTypographyProps={{
                sx: { mr: 2, overflowX: 'scroll' },
                className: 'hideScrollbar',
              }}
            >
              {list.name}
            </EditableTypography>
            <Box display='flex' alignItems='center'>
              <Typography
                variant='h5'
                component='p'
                fontWeight={500}
                display='inline'
              >
                {`${list.items.length}/`}
              </Typography>
              <EditableTypography
                inputType='number'
                typographyVariant='h5'
                typographyComponent='h2'
                fontWeight='medium'
                handleSaveChange={updateMaxItems}
                otherTextFieldProps={{
                  InputProps: {
                    inputProps: {
                      min: list.items.length,
                    },
                    sx: { width: 50 },
                  },
                }}
              >
                {list.maxItems}
              </EditableTypography>
              <IconButton onClick={handleOpenMenu} sx={{ mr: -1 }}>
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={menuAnchor}
                open={isMenuOpen}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={deleteList}>Delete list</MenuItem>
              </Menu>
            </Box>
          </Stack>
          <Droppable
            droppableId={list.id}
            type='list'
            isDropDisabled={isDropDisabled}
          >
            {provided => (
              <Box
                /*
          the minHeight is to prevent the droppable from being 'disappearing' when the list has 
          no items so that items can still be dropped in the list
          */
                minHeight='1px'
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {list.items.map((itemId, index) => (
                  <BoardListItem
                    key={itemId}
                    itemId={itemId}
                    index={index}
                    list={list}
                  />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
          <AddItemBlock list={list} />
        </Box>
      )}
    </Draggable>
  )
})

export default BoardList
