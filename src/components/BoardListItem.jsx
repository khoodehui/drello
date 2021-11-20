import { Card, CardContent } from '@mui/material'
import { Draggable } from 'react-beautiful-dnd'
import useItemUtil from '../hooks/useItemUtil'
import EditableTypography from './EditableTypography'

const BoardListItem = ({ itemId, index }) => {
  const { getItemById, updateItemContent } = useItemUtil()
  const item = getItemById(itemId)

  const changeContent = value => {
    if (value.length > 0) {
      updateItemContent(item, value)
    }
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
            <EditableTypography handleSaveChange={changeContent}>
              {item.content}
            </EditableTypography>
          </CardContent>
        </Card>
      )}
    </Draggable>
  )
}

export default BoardListItem
