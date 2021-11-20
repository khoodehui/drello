import { Card, CardContent, IconButton, Stack } from '@mui/material'
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
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ marginTop: 8, ...provided.draggableProps.style }}
        >
          <CardContent>
            <Stack direction='row' justifyContent='space-between'>
              <EditableTypography handleSaveChange={changeContent}>
                {item.content}
              </EditableTypography>
              <IconButton onClick={handleDeleteItem}>
                <ClearIcon />
              </IconButton>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Draggable>
  )
}

export default BoardListItem
