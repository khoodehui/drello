import { createSlice } from '@reduxjs/toolkit'

const sampleBoard = {
  id: 'sample',
  name: 'Sample Board',
  desc: 'Sample desc',
}

const saveBoardsState = boards => {
  window.localStorage.setItem('boards', JSON.stringify(boards))
}

const boardsSlice = createSlice({
  name: 'boards',
  initialState: {
    boards: [],
  },
  reducers: {
    initBoardsNewUser: state => {
      state.boards.push(sampleBoard)
      saveBoardsState(state.boards)
    },
    initBoardsFromStorage: (state, action) => {
      state.boards = JSON.parse(action.payload)
    },
    newBoard: (state, action) => {
      state.boards.push(action.payload)
      saveBoardsState(state.boards)
    },
    deleteBoard: (state, action) => {
      state.boards = state.boards.filter(board => board.id !== action.payload)
      saveBoardsState(state.boards)
    },
    updateBoard: (state, action) => {
      state.boards = state.boards.map(board =>
        board.id === action.payload.id ? action.payload : board
      )
      saveBoardsState(state.boards)
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
