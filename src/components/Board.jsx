import { useParams, useNavigate } from 'react-router-dom'
import BoardList from './BoardList'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Box, Container, IconButton, Stack } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import useBoardUtil from '../hooks/useBoardUtil'
import useListUtil from '../hooks/useListUtil'
import EditableTypography from './EditableTypography'
import { useState } from 'react'
import AddListBlock from './AddListBlock'

const Board = () => {
  const id = useParams().id
  const navigate = useNavigate()
  const { getBoardById, updateBoardInfo, swapLists } = useBoardUtil()
  const { getListById, swapItemsInList, swapItemBetweenLists } = useListUtil()
  const board = getBoardById(id)

  /*
  Keeps track of the index of the source list when an item is dragged.
  Used to still allow dragging and dropping within a list even when it has max items.
  See the variable isDropDisabled in BoardList.jsx for more info.
  */
  const [srcDroppableIndex, setSrcDroppableIndex] = useState(null)

  /*
  The board variable may take a moment to initialise. When it does not have a value
  yet, return null in the meantime.
  */
  if (!board) {
    return null
  }

  const goHome = () => navigate('/')

  const updateBoardName = value => {
    if (value.length > 0) {
      updateBoardInfo(board, value)
    }
  }

  // updates the index of the source list when a drag operation begins
  const onDragStart = start => {
    setSrcDroppableIndex(board.lists.indexOf(start.source.droppableId))
  }

  // updates the state(s) of the involved list(s) at the end of a drag and drop operation
  const onDragEnd = result => {
    setSrcDroppableIndex(null)

    const { source, destination, type } = result

    // no action taken
    if (!destination) {
      return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // swapping between lists
    if (type === 'board') {
      swapLists(board, source.index, destination.index)
      return
    }

    // swapping between items
    if (destination.droppableId === source.droppableId) {
      swapItemsInList(
        getListById(destination.droppableId),
        source.index,
        destination.index
      )
    } else {
      swapItemBetweenLists(
        getListById(source.droppableId),
        getListById(destination.droppableId),
        source.index,
        destination.index
      )
    }
  }
  return (
    <Container maxWidth='xl'>
      <Stack direction='row' sx={{ mt: 3, mb: 2, whiteSpace: 'nowrap' }}>
        <IconButton onClick={goHome}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <EditableTypography
          inputType='text'
          typographyVariant='h4'
          typographyComponent='h1'
          handleSaveChange={updateBoardName}
          otherTextFieldProps={{
            sx: { width: 1 },
          }}
          otherTypographyProps={{
            sx: { overflow: 'scroll' },
            className: 'hideScrollbar',
          }}
        >
          {board.name}
        </EditableTypography>
      </Stack>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Droppable droppableId={board.id} type='board' direction='horizontal'>
          {provided => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              id='lists'
              whiteSpace='nowrap'
              sx={{ overflowX: 'scroll' }}
            >
              {board.lists.map((listId, index) => (
                <BoardList
                  key={listId}
                  listId={listId}
                  index={index}
                  board={board}
                  isSrcDroppableSelf={srcDroppableIndex === index}
                />
              ))}
              {provided.placeholder}
              <AddListBlock board={board} />
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  )
}

export default Board
