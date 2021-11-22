import { Box, IconButton, Paper, Stack } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { Draggable } from 'react-beautiful-dnd'
import useItemUtil from '../hooks/useItemUtil'
import EditableTypography from './EditableTypography'
import useListUtil from '../hooks/useListUtil'

const BoardListItem = ({ list, itemId, index }) => {
  const { getItemById, removeItem, updateItemContent } = useItemUtil()
  const { removeItemFromList } = useListUtil()
  const item = getItemById(itemId)

  const changeContent = value => {
    if (value.length > 0) {
      updateItemContent(item, value)
    }
  }

  const handleDeleteItem = () => {
    removeItem(item)
    removeItemFromList(list, itemId)
  }

  return (
    <Draggable draggableId={item.id} index={index}>
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
            <Box sx={{ whiteSpace: 'normal' }} maxWidth={0.85}>
              <EditableTypography
                handleSaveChange={changeContent}
                otherTextFieldProps={{ multiline: true, sx: { width: 1 } }}
                otherTypographyProps={{
                  sx: { wordWrap: 'break-word' },
                }}
              >
                {item.content}
              </EditableTypography>
            </Box>
            <IconButton onClick={handleDeleteItem}>
              <ClearIcon />
            </IconButton>
          </Stack>
        </Paper>
      )}
    </Draggable>
  )
}

export default BoardListItem
