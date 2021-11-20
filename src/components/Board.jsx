import { useParams, useNavigate } from 'react-router-dom'
import BoardList from './BoardList'
import { DragDropContext } from 'react-beautiful-dnd'
import { Container, IconButton, Stack } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import useBoardUtil from '../hooks/useBoardUtil'
import useListUtil from '../hooks/useListUtil'
import EditableTypography from './EditableTypography'

const Board = () => {
  const id = useParams().id
  const navigate = useNavigate()
  const { getBoardById, updateBoardInfo } = useBoardUtil()
  const { getListById, enableDrop, swapItemsInList, swapItemBetweenLists } =
    useListUtil()
  const board = getBoardById(id)

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

  /* 
  In the case when a list already has maximum items, this will allow items to still 
  be dragged and dropped within that list. The correct value for isDropDisabled for 
  the list will be restored when the drag and drop operation completes.
  */
  const onDragStart = start => {
    const { source } = start
    enableDrop(getListById(source.droppableId))
  }

  // Updates the state(s) of the involved list(s) at the end of a drag and drop operation
  const onDragEnd = result => {
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
    <Container maxWidth='lg'>
      <Stack direction='row' sx={{mt: 3, mb: 2}}>
        <IconButton onClick={goHome}>
          <ArrowBackIosNewIcon />
        </IconButton>
      <EditableTypography
        handleSaveChange={updateBoardName}
        typographyProps={{ variant: 'h4', component: 'h1'}}
      >
        {board.name}
      </EditableTypography>
      </Stack>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        {board.lists.map(listId => (
          <BoardList key={listId} listId={listId} />
        ))}
      </DragDropContext>
    </Container>
  )
}

export default Board
