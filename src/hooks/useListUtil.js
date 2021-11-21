import { v4 as uuid } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { deleteList, newList, updateList } from '../reducers/listsReducer'

// hook that provides utility functions with respect to lists
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
      maxItems: 5,
    }
    dispatch(newList(list))
    return list
  }

  const removeList = list => dispatch(deleteList(list))

  const renameList = (list, newName) => {
    const updatedList = { ...list, name: newName }
    dispatch(updateList(updatedList))
  }

  const enableDrop = list => {
    const updatedList = { ...list }
    dispatch(updateList(updatedList))
  }

  const addItemToList = (list, itemId) => {
    const newItemsList = list.items.concat(itemId)
    const updatedList = { ...list, items: newItemsList }
    dispatch(updateList(updatedList))
  }

  const removeItemFromList = (list, itemId) => {
    const newItemsList = list.items.filter(id => id !== itemId)
    const updatedList = { ...list, items: newItemsList }
    dispatch(updateList(updatedList))
  }

  const setListMaxItems = (list, newMax) => {
    const updatedList = {
      ...list,
      maxItems: newMax,
    }
    dispatch(updateList(updatedList))
  }

  const swapItemsInList = (list, sourceIndex, destIndex) => {
    const newItemsList = Array.from(list.items)
    const [item] = newItemsList.splice(sourceIndex, 1)
    newItemsList.splice(destIndex, 0, item)
    const updatedList = {
      ...list,
      items: newItemsList,
    }
    dispatch(updateList(updatedList))
  }

  const swapItemBetweenLists = (
    sourceList,
    destList,
    sourceIndex,
    destIndex
  ) => {
    const newSourceListItems = Array.from(sourceList.items)
    const newDestListItems = Array.from(destList.items)

    const [item] = newSourceListItems.splice(sourceIndex, 1)
    newDestListItems.splice(destIndex, 0, item)

    const updatedSourceList = {
      ...sourceList,
      items: newSourceListItems,
    }
    const updatedDestList = {
      ...destList,
      items: newDestListItems,
    }
    dispatch(updateList(updatedSourceList))
    dispatch(updateList(updatedDestList))
  }

  return {
    getLists,
    getListById,
    createList,
    removeList,
    renameList,
    enableDrop,
    addItemToList,
    removeItemFromList,
    setListMaxItems,
    swapItemsInList,
    swapItemBetweenLists,
  }
}

export default useListUtil
