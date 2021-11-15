import { v4 as uuid } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { newBoard } from '../reducers/boardsReducer'
import { Button } from '@mui/material'
import BoardCard from './BoardCard'

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

  return (
    <div>
      <h1>Home</h1>
      {boards.map(board => (
        <BoardCard key={board.id} board={board} />
      ))}
      <Button variant='contained' onClick={handleNewBoard}>
        Create New
      </Button>
    </div>
  )
}

export default Home
