import { createSlice } from '@reduxjs/toolkit'

const boardsSlice = createSlice({
  name: 'boards',
  initialState: [],
  reducers: {
    newBoard: (state, action) => {
      state.push(action.payload)
    },
    deleteBoard: (state, action) => {
      return state.filter(board => board.id !== action.payload)
    },
    updateBoard: (state, action) => {
      return state.map(board =>
        board.id === action.payload.id ? action.payload : board
      )
    },
  },
})

export const {
  newBoard,
  deleteBoard,
  updateBoard,
} = boardsSlice.actions
export default boardsSlice.reducer
