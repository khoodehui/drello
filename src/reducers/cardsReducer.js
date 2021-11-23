import { createSlice } from '@reduxjs/toolkit'

// reducer to manage the state of cards
const cardsSlice = createSlice({
  name: 'cards',
  initialState: {},
  reducers: {
    newCard: (state, action) => {
      state[action.payload.id] = action.payload
    },
    deleteCard: (state, action) => {
      delete state[action.payload.id]
    },
    updateCard: (state, action) => {
      state[action.payload.id] = action.payload
    },
  },
})

export const {
  newCard,
  deleteCard,
  updateCard,
} = cardsSlice.actions
export default cardsSlice.reducer
