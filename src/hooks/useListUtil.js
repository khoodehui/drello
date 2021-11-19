import { v4 as uuid } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { deleteList, newList, updateList } from '../reducers/listsReducer'

const useListUtil = () => {
  const lists = useSelector(state => state.lists)
  const dispatch = useDispatch()

  const getLists = () => lists

  const getListById = id => lists[id]

  const createList = name => {
    const list = {
      id: uuid(),
      name,
      items: [],
    }
    dispatch(newList(list))
    return list
  }

  const removeList = list => dispatch(deleteList(list))

  const renameList = (list, newName) => {
    const updatedList = { ...list, name: newName }
    dispatch(updateList(updatedList))
  }

  const addItemToList = (list, itemId) => {
    console.log(itemId)
    const newItemsList = list.items.concat(itemId)
    const updatedList = { ...list, items: newItemsList }
    dispatch(updateList(updatedList))
  }

  const removeItemFromList = (list, itemId) => {
    const newItemsList = list.items.filter(id => id !== itemId)
    const updatedList = { ...list, items: newItemsList }
    dispatch(updateList(updatedList))
  }

  const swapItemsInList = (list, firstIndex, secondIndex) => {
    const firstItem = list.items[firstIndex]
    const secondItem = list.items[secondIndex]
    const newItemsList = Array.from(list.items)
    newItemsList[firstIndex] = secondItem
    newItemsList[secondIndex] = firstItem
    const updatedList = { ...list, items: newItemsList }
    dispatch(updateList(updatedList))
  }

  return {
    getLists,
    getListById,
    createList,
    removeList,
    renameList,
    addItemToList,
    removeItemFromList,
    swapItemsInList,
  }
}

export default useListUtil
