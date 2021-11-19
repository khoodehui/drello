import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Board from './components/Board'
import useBoardUtil from './hooks/useBoardUtil'

const App = () => {
  const {createSampleBoard} = useBoardUtil()

  if (!localStorage.getItem('appState')) {
    createSampleBoard()
  }

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/:id' element={<Board />} />
    </Routes>
  )
}

export default App
