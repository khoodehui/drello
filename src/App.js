import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Board from './components/Board'
import useBoardUtil from './hooks/useBoardUtil'
import DrelloAppBar from './components/DrelloAppBar'

const App = () => {
  const { createSampleBoard } = useBoardUtil()

  // if application is used for the first time, initalize a sample board
  if (!localStorage.getItem('appState')) {
    createSampleBoard()
  }

  return (
    <>
      <DrelloAppBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id' element={<Board />} />
      </Routes>
    </>
  )
}

export default App
