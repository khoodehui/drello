import { configureStore } from '@reduxjs/toolkit'
import boardsReducer from './reducers/boardsReducer'
import itemsReducer from './reducers/itemsReducer'
import listsReducer from './reducers/listsReducer'

// initialize the app state from local storage, if any
const persistedState = localStorage.getItem('appState')
  ? JSON.parse(localStorage.getItem('appState'))
  : {}

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    lists: listsReducer,
    items: itemsReducer
  },
  preloadedState: persistedState
})

// saves app state to local storage after every change to it
store.subscribe(() => {
  localStorage.setItem('appState', JSON.stringify(store.getState()))
})

export default store
