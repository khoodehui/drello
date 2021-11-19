import { Droppable } from 'react-beautiful-dnd'
import BoardListItem from './BoardListItem'

const BoardList = ({ list }) => {
  return (
    <Droppable droppableId={list.id}>
      {provided => (
        <div ref={provided.innerRef}>
          <h2>{list.name}</h2>
          {list.items.map((item, index) => (
            <BoardListItem key={item.id} item={item} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default BoardList
