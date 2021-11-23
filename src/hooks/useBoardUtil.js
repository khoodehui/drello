import { v4 as uuid } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import useColumnUtil from './useColumnUtil'
import { deleteBoard, newBoard, updateBoard } from '../reducers/boardsReducer'
import useCardUtil from './useCardUtil'

// hook that provides utility functions with respect to boards
const useBoardUtil = () => {
  const boards = useSelector(state => state.boards)
  const dispatch = useDispatch()
  const { getColumnById, createColumn, addCardToColumn, removeColumn } = useColumnUtil()
  const { createCard } = useCardUtil()

  const getBoards = () => boards

  const getBoardById = id => boards.find(board => board.id === id)

  const createSampleBoard = () => {
    const toDoColumn = createColumn('To-Do')
    const toDoCards = [
      createCard('Click on various elements in the board to edit them, including the contents of this card.').id,
      createCard('Drag and drop cards, and even columns.').id,
      createCard("Press Shift+Enter when typing a card's content to enter a new line.\n\nWorks on mobile too, although the method may be slightly different.").id,
      createCard('Fourth Card').id,
      createCard('Fifth Card').id,
    ]
    addCardToColumn(toDoColumn, toDoCards)

    const inProgColumn = createColumn('In Progress')
    const inProgCards = [
      createCard('Sixth Card').id,
      createCard('Seventh Card').id,
      createCard('Eight Card').id,
    ]
    addCardToColumn(inProgColumn, inProgCards)

    const doneColumn = createColumn('Done')

    const board = {
      id: uuid(),
      name: 'Sample Board',
      desc: 'Try out Drello right away.',
      columns: [toDoColumn.id, inProgColumn.id, doneColumn.id],
    }

    dispatch(newBoard(board))
  }

  const createBoard = (name, desc) => {
    const board = {
      id: uuid(),
      name,
      desc,
      columns: [
        createColumn('To-Do').id,
        createColumn('In Progress').id,
        createColumn('Done').id,
      ],
    }
    dispatch(newBoard(board))
    return board
  }

  const removeBoard = board => {
    board.columns.forEach(columnId => removeColumn(getColumnById(columnId)))
    dispatch(deleteBoard(board))
  }

  const updateBoardInfo = (board, name, desc = board.desc) => {
    const updatedBoard = { ...board, name, desc }
    dispatch(updateBoard(updatedBoard))
  }

  const addColumnToBoard = (board, columnId) => {
    const newColumns = board.columns.concat(columnId)
    const updatedBoard = { ...board, columns: newColumns }
    dispatch(updateBoard(updatedBoard))
  }

  const removeColumnFromBoard = (board, columnId) => {
    const newColumns = board.columns.filter(id => id !== columnId)
    const updatedBoard = { ...board, columns: newColumns }
    dispatch(updateBoard(updatedBoard))
  }

  const swapColumns = (board, sourceIndex, destIndex) => {
    const newColumns = Array.from(board.columns)
    const [column] = newColumns.splice(sourceIndex, 1)
    newColumns.splice(destIndex, 0, column)
    const updatedBoard = {
      ...board,
      columns: newColumns,
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
    addColumnToBoard,
    removeColumnFromBoard,
    swapColumns,
  }
}

export default useBoardUtil
