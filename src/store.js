import { configureStore } from '@reduxjs/toolkit'
import boardsReducer from './reducers/boardsReducer'

export default configureStore({
  reducer: {
    boards: boardsReducer
  },
})
