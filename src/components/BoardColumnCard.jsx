import { Box, IconButton, Paper, Stack } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { Draggable } from 'react-beautiful-dnd'
import React from 'react'
import useCardUtil from '../hooks/useCardUtil'
import EditableTypography from './EditableTypography'
import useColumnUtil from '../hooks/useColumnUtil'

const BoardColumnCard = React.memo(({ column, cardId, index }) => {
  const { getCardById, removeCard, updateCardContent } = useCardUtil()
  const { removeCardFromColumn } = useColumnUtil()
  const card = getCardById(cardId)

  const changeContent = value => {
    if (value.length > 0) {
      updateCardContent(card, value)
    }
  }

  const handleDeleteCard = () => {
    removeCard(card)
    removeCardFromColumn(column, cardId)
  }

  return (
    <Draggable draggableId={card.id} index={index}>
      {provided => (
        <Paper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{ mt: 1, p: 1, pl: 2 }}
        >
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Box sx={{ whiteSpace: 'normal' }} width={0.85}>
              <EditableTypography
                handleSaveChange={changeContent}
                otherTextFieldProps={{ multiline: true, sx: { width: 1 } }}
                otherTypographyProps={{
                  sx: { wordWrap: 'break-word', whiteSpace: 'pre-wrap' },
                }}
              >
                {card.content}
              </EditableTypography>
            </Box>
            <IconButton onClick={handleDeleteCard}>
              <ClearIcon />
            </IconButton>
          </Stack>
        </Paper>
      )}
    </Draggable>
  )
})

export default BoardColumnCard
