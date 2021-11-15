import { v4 as uuid } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { newBoard, deleteBoard } from '../reducers/boardsReducer'

const Home = () => {
  const boards = useSelector(state => state.boards.boards)
  const dispatch = useDispatch()

  const handleNewBoard = () => {
    const board = {
      id: uuid(),
      name: 'New Board',
      desc: 'Board Desc',
    }
    dispatch(newBoard(board))
  }

  const handleDeleteBoard = id => () => {
    dispatch(deleteBoard(id))
  }

  return (
    <div>
      <h1>Home</h1>
      {boards.map(board => (
        <div key={board.id}>
          <h2>{board.name}</h2>
          <p>{board.desc}</p>
          <button onClick={handleDeleteBoard(board.id)}>Delete Board</button>
        </div>
      ))}
      <button onClick={handleNewBoard}>Create New</button>
    </div>
  )
}

export default Home
