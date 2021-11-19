import { Draggable } from 'react-beautiful-dnd'

const BoardListItem = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{height: 40, ...provided.draggableProps.style}}
        >
          {item.content}
        </div>
      )}
    </Draggable>
  )
}

export default BoardListItem
