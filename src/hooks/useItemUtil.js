import { v4 as uuid } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem, newItem, updateItem } from '../reducers/itemsReducer'

// hook that provides utility functions with respect to items
const useItemUtil = () => {
  const items = useSelector(state => state.items)
  const dispatch = useDispatch()

  const getItems = () => items

  const getItemById = id => items[id]

  const createItem = content => {
    const item = {
      id: uuid(),
      content,
    }
    dispatch(newItem(item))
    return item
  }

  const removeItem = item => dispatch(deleteItem(item))

  const updateItemContent = (item, newContent) => {
    const updatedItem = { ...item, content: newContent }
    dispatch(updateItem(updatedItem))
  }

  return {
    getItems,
    getItemById,
    createItem,
    removeItem,
    updateItemContent,
  }
}

export default useItemUtil
