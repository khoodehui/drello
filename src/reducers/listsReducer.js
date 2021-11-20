import { createSlice } from '@reduxjs/toolkit'

// reducer to manage the state of lists
const listsSlice = createSlice({
  name: 'items',
  initialState: {},
  reducers: {
    newList: (state, action) => {
      state[action.payload.id] = action.payload
    },
    deleteList: (state, action) => {
      delete state[action.payload.id]
    },
    updateList: (state, action) => {
      state[action.payload.id] = action.payload
    },
  },
})

export const {
  initListsFromStorage,
  newList,
  deleteList,
  updateList,
} = listsSlice.actions
export default listsSlice.reducer
