import { Routes, Route } from 'react-router-dom'

import Home from './components/Home'
import Foo from './components/Foo'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/foo' element={<Foo />} />
    </Routes>
  )
}

export default App
