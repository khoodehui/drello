import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import Home from './components/Home'
import { useDispatch } from 'react-redux'
import { initBoardsNewUser, initBoardsFromStorage } from './reducers/boardsReducer'
import Board from './components/Board'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedBoardsData = window.localStorage.getItem("boards");
    if (savedBoardsData) {
      dispatch(initBoardsFromStorage(savedBoardsData))
    } else {
      dispatch(initBoardsNewUser())
    }
  }, [dispatch])

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/:id' element={<Board />} />
    </Routes>
  )
}

export default App
