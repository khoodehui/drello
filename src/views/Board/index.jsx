import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Box, Container, IconButton, Stack } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import EditableTypography from '../../components/EditableTypography'
import KanbanColumn from './KanbanColumn'
import AddColumnBlock from './AddColumnBlock'
import useBoardUtil from '../../hooks/useBoardUtil'
import useColumnUtil from '../../hooks/useColumnUtil'

const Board = () => {
  const id = useParams().id
  const navigate = useNavigate()
  const { getBoardById, updateBoardInfo, swapColumns } = useBoardUtil()
  const { getColumnById, swapCardsInColumn, swapCardBetweenColumns } = useColumnUtil()
  const board = getBoardById(id)

  /*
  Keeps track of the index of the source column when a card is dragged.
  Used to still allow dragging and dropping within a column even when it has max cards.
  See the variable isDropDisabled in BoardColumn.jsx for more info.
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

  // updates the index of the source column when a drag operation begins
  const onDragStart = start => {
    setSrcDroppableIndex(board.columns.indexOf(start.source.droppableId))
  }

  // updates the state(s) of the involved column(s) at the end of a drag and drop operation
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

    // swapping between columns
    if (type === 'board') {
      swapColumns(board, source.index, destination.index)
      return
    }

    // swapping between cards
    if (destination.droppableId === source.droppableId) {
      swapCardsInColumn(
        getColumnById(destination.droppableId),
        source.index,
        destination.index
      )
    } else {
      swapCardBetweenColumns(
        getColumnById(source.droppableId),
        getColumnById(destination.droppableId),
        source.index,
        destination.index
      )
    }
  }
  return (
    <Container maxWidth='xl' sx={{pb: 4}}>
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
              id='columns'
              whiteSpace='nowrap'
              sx={{ overflowX: 'scroll' }}
            >
              {board.columns.map((columnId, index) => (
                <KanbanColumn
                  key={columnId}
                  columnId={columnId}
                  index={index}
                  board={board}
                  isSrcDroppableSelf={srcDroppableIndex === index}
                />
              ))}
              {provided.placeholder}
              <AddColumnBlock board={board} />
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  )
}

export default Board
