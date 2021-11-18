import { createSlice } from '@reduxjs/toolkit'

const sampleBoard = {
  id: 'sample',
  name: 'Sample Board',
  desc: 'Sample desc',
}

const boardsSlice = createSlice({
  name: 'boards',
  initialState: [],
  reducers: {
    initSampleBoard: state => {
      state.push(sampleBoard)
    },
    initBoardsFromStorage: (state, action) => {
      return action.payload
    },
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
  initSampleBoard,
  initBoardsFromStorage,
  newBoard,
  deleteBoard,
  updateBoard,
} = boardsSlice.actions
export default boardsSlice.reducer
