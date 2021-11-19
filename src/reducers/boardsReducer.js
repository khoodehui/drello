import { createSlice } from '@reduxjs/toolkit'

const sampleBoard = {
  id: 'sample',
  name: 'Sample Board',
  desc: 'Sample desc',
  lists: [
    {
      id: 'samplelist',
      name: 'Sample List',
      items: [
        { id: 'item1', content: 'Item 1' },
        { id: 'item2', content: 'Item 2' },
        { id: 'item3', content: 'Item 3' },
        { id: 'item4', content: 'Item 4' },
      ],
    },
    {
      id: 'samplelist2',
      name: 'Sample List 2',
      items: [
        { id: 'item5', content: 'Item 5' },
        { id: 'item6', content: 'Item 6' },
        { id: 'item7', content: 'Item 7' },
        { id: 'item8', content: 'Item 8' },
      ],
    },
  ],
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
