import { configureStore } from '@reduxjs/toolkit'
import boardsReducer from './reducers/boardsReducer'

const store =  configureStore({
  reducer: {
    boards: boardsReducer,
  }
})

store.subscribe(() => {
  localStorage.setItem('boards', JSON.stringify(store.getState().boards.boards))
})

export default store
