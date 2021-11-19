import { Card, CardContent, Typography } from '@mui/material'
import { Draggable } from 'react-beautiful-dnd'

const BoardListItem = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {provided => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{marginTop: 8, ...provided.draggableProps.style}}
        >
          <CardContent><Typography>{item.content}</Typography></CardContent>
        </Card>
      )}
    </Draggable>
  )
}

export default BoardListItem
