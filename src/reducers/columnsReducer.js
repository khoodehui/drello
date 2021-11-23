import { createSlice } from '@reduxjs/toolkit'

// reducer to manage the state of columns
const columnsSlice = createSlice({
  name: 'columns',
  initialState: {},
  reducers: {
    newColumn: (state, action) => {
      state[action.payload.id] = action.payload
    },
    deleteColumn: (state, action) => {
      delete state[action.payload.id]
    },
    updateColumn: (state, action) => {
      state[action.payload.id] = action.payload
    },
  },
})

export const {
  initColumnsFromStorage,
  newColumn,
  deleteColumn,
  updateColumn,
} = columnsSlice.actions
export default columnsSlice.reducer
