import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Board = () => {
  const id = useParams().id
  const board = useSelector(state => state.boards.find(board => board.id === id))

  if (!board) {
    return null
  }

  return board.id
}

export default Board