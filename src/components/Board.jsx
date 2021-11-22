import { useParams, useNavigate } from 'react-router-dom'
import BoardList from './BoardList'
import { DragDropContext } from 'react-beautiful-dnd'
import { Box, Container, IconButton, Stack } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import useBoardUtil from '../hooks/useBoardUtil'
import useListUtil from '../hooks/useListUtil'
import EditableTypography from './EditableTypography'
import { useRef, useState } from 'react'
import AddListBlock from './AddListBlock'

const Board = () => {
  const id = useParams().id
  const navigate = useNavigate()
  const { getBoardById, updateBoardInfo } = useBoardUtil()
  const { getListById, swapItemsInList, swapItemBetweenLists } = useListUtil()
  const board = getBoardById(id)
  const ref = useRef()

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

    const { source, destination } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

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
      <Stack ref={ref} direction='row' sx={{ mt: 3, mb: 2 }}>
        <IconButton onClick={goHome}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <EditableTypography
          inputType='text'
          typographyVariant='h4'
          typographyComponent='h1'
          handleSaveChange={updateBoardName}
        >
          {board.name}
        </EditableTypography>
      </Stack>
      <Box id='lists' whiteSpace='nowrap' sx={{ overflowX: 'scroll' }}>
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
          {board.lists.map((listId, index) => (
            <BoardList
              key={listId}
              listId={listId}
              board={board}
              isSrcDroppableSelf={srcDroppableIndex === index}
            />
          ))}
        </DragDropContext>
        <AddListBlock board={board} />
      </Box>
    </Container>
  )
}

export default Board
