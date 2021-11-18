import { createSlice } from '@reduxjs/toolkit'

const sampleBoard = {
  id: 'sample',
  name: 'Sample Board',
  desc: 'Sample desc',
}

const boardsSlice = createSlice({
  name: 'boards',
  initialState: {
    boards: [],
  },
  reducers: {
    initBoardsNewUser: state => {
      state.boards.push(sampleBoard)
    },
    initBoardsFromStorage: (state, action) => {
      state.boards = JSON.parse(action.payload)
    },
    newBoard: (state, action) => {
      state.boards.push(action.payload)
    },
    deleteBoard: (state, action) => {
      state.boards = state.boards.filter(board => board.id !== action.payload)
    },
    updateBoard: (state, action) => {
      state.boards = state.boards.map(board =>
        board.id === action.payload.id ? action.payload : board
      )
    },
  },
})

export const {
  initBoardsNewUser,
  initBoardsFromStorage,
  newBoard,
  deleteBoard,
  updateBoard,
} = boardsSlice.actions
export default boardsSlice.reducer
