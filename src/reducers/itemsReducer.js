import { createSlice } from '@reduxjs/toolkit'

// reducer to manage the state of items
const itemsSlice = createSlice({
  name: 'items',
  initialState: {},
  reducers: {
    newItem: (state, action) => {
      state[action.payload.id] = action.payload
    },
    deleteItem: (state, action) => {
      delete state[action.payload.id]
    },
    updateItem: (state, action) => {
      state[action.payload.id] = action.payload
    },
  },
})

export const {
  newItem,
  deleteItem,
  updateItem,
} = itemsSlice.actions
export default itemsSlice.reducer
