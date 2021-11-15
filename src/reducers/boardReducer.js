import { createSlice } from '@reduxjs/toolkit'

const boardSlice = createSlice({
  name: 'board',
  initialState: {
    boards: [],
  },
  reducers: {
    newBoard: (state, action) => {
      state.boards.push(action.data)
    },
    deleteBoard: (state, action) => {
      state = state.boards.filter(board => board.name !== action.data)
    },
  },
})

export const { newBoard, deleteBoard } = boardSlice.actions
export default boardSlice.reducer
