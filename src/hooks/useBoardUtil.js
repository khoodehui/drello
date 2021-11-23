import { v4 as uuid } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import useListUtil from './useListUtil'
import { deleteBoard, newBoard, updateBoard } from '../reducers/boardsReducer'
import useItemUtil from './useItemUtil'

// hook that provides utility functions with respect to boards
const useBoardUtil = () => {
  const boards = useSelector(state => state.boards)
  const dispatch = useDispatch()
  const { getListById, createList, addItemToList, removeList } = useListUtil()
  const { createItem } = useItemUtil()

  const getBoards = () => boards

  const getBoardById = id => boards.find(board => board.id === id)

  const createSampleBoard = () => {
    const toDoList = createList('To-Do')
    const toDoItems = [
      createItem('Click on various elements in the board to edit them.').id,
      createItem('Drag and drop cards, and even columns.').id,
      createItem("Press Shift+Enter when typing a card's content to enter a new line.\n\nWorks on mobile too, although the method may be slightly different.").id,
      createItem('Fourth Item').id,
      createItem('Fifth Item').id,
    ]
    addItemToList(toDoList, toDoItems)

    const inProgList = createList('In Progress')
    const inProgItems = [
      createItem('Sixth Item').id,
      createItem('Seventh Item').id,
      createItem('Eight Item').id,
    ]
    addItemToList(inProgList, inProgItems)

    const doneList = createList('Done')

    const board = {
      id: uuid(),
      name: 'Sample Board',
      desc: 'Sample board to let you experience Drello right away.',
      lists: [toDoList.id, inProgList.id, doneList.id],
    }

    dispatch(newBoard(board))
  }

  const createBoard = (name, desc) => {
    const board = {
      id: uuid(),
      name,
      desc,
      lists: [
        createList('To-Do').id,
        createList('In Progress').id,
        createList('Done').id,
      ],
    }
    dispatch(newBoard(board))
    return board
  }

  const removeBoard = board => {
    board.lists.forEach(listId => removeList(getListById(listId)))
    dispatch(deleteBoard(board))
  }

  const updateBoardInfo = (board, name, desc = board.desc) => {
    const updatedBoard = { ...board, name, desc }
    dispatch(updateBoard(updatedBoard))
  }

  const addListToBoard = (board, listId) => {
    const newListsArray = board.lists.concat(listId)
    const updatedBoard = { ...board, lists: newListsArray }
    dispatch(updateBoard(updatedBoard))
  }

  const removeListFromBoard = (board, listId) => {
    const newListsArray = board.lists.filter(id => id !== listId)
    const updatedBoard = { ...board, lists: newListsArray }
    dispatch(updateBoard(updatedBoard))
  }

  const swapLists = (board, sourceIndex, destIndex) => {
    const newListsArray = Array.from(board.lists)
    const [list] = newListsArray.splice(sourceIndex, 1)
    newListsArray.splice(destIndex, 0, list)
    const updatedBoard = {
      ...board,
      lists: newListsArray,
    }
    dispatch(updateBoard(updatedBoard))
  }

  return {
    getBoards,
    getBoardById,
    createSampleBoard,
    createBoard,
    removeBoard,
    updateBoardInfo,
    addListToBoard,
    removeListFromBoard,
    swapLists,
  }
}

export default useBoardUtil
