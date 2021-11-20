import { v4 as uuid } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import useListUtil from './useListUtil'
import { deleteBoard, newBoard, updateBoard } from '../reducers/boardsReducer'
import useItemUtil from './useItemUtil'

// hook that provides utility functions with respect to boards
const useBoardUtil = () => {
  const boards = useSelector(state => state.boards)
  const dispatch = useDispatch()
  const { createList, addItemToList } = useListUtil()
  const { createItem } = useItemUtil()

  const getBoards = () => boards

  const getBoardById = id => boards.find(board => board.id === id)

  const createSampleBoard = () => {
    const toDoList = createList('To Dos')
    const toDoItems = [createItem('First Item').id, createItem('Second Item').id, createItem('Third Item').id]
    addItemToList(toDoList, toDoItems)

    const inProgList = createList('In Progress')
    const inProgItems = [createItem('Fourth Item').id, createItem('Fifth Item').id, createItem('Sixth Item').id]
    addItemToList(inProgList, inProgItems)

    const completedList = createList('Completed')
    const completedItems = [createItem('Seventh Item').id, createItem('Eigth Item').id, createItem('Ninth Item').id]
    addItemToList(completedList, completedItems)

    const board = {
      id: uuid(),
      name: 'Sample Board',
      desc: 'Sample board to let you experience Drello',
      lists: [
        toDoList.id,
        inProgList.id,
        completedList.id,
      ],
    }

    dispatch(newBoard(board))
  }

  const createBoard = (name, desc) => {
    const board = {
      id: uuid(),
      name,
      desc,
      lists: [
        createList('To Dos').id,
        createList('In Progress').id,
        createList('Completed').id,
      ],
    }
    dispatch(newBoard(board))
    return board
  }

  const removeBoard = board => dispatch(deleteBoard(board))

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

  return {
    getBoards,
    getBoardById,
    createSampleBoard,
    createBoard,
    removeBoard,
    updateBoardInfo,
    addListToBoard,
    removeListFromBoard,
  }
}

export default useBoardUtil
