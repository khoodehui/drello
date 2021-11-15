import { createSlice } from '@reduxjs/toolkit'

const boardsSlice = createSlice({
  name: 'boards',
  initialState: {
    boards: [{ id: 'sample', name: 'Sample Board', desc: 'Sample Desc' }],
  },
  reducers: {
    newBoard: (state, action) => {
      state.boards.push(action.payload)
    },
    deleteBoard: (state, action) => {
      state.boards = state.boards.filter(board => board.id !== action.payload)
    },
  },
})

export const { newBoard, deleteBoard } = boardsSlice.actions
export default boardsSlice.reducer
