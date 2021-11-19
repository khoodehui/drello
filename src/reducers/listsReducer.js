import { createSlice } from '@reduxjs/toolkit'

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
