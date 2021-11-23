import { v4 as uuid } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { deleteColumn, newColumn, updateColumn } from '../reducers/columnsReducer'
import useCardUtil from './useCardUtil'

// hook that provides utility functions with respect to columns
const useColumnUtil = () => {
  const columns = useSelector(state => state.columns)
  const dispatch = useDispatch()
  const { getCardById, removeCard } = useCardUtil()

  const getColumns = () => columns

  const getColumnById = id => columns[id]

  const createColumn = name => {
    const column = {
      id: uuid(),
      name,
      cards: [],
      maxCards: 5,
    }
    dispatch(newColumn(column))
    return column
  }

  const removeColumn = column => {
    column.cards.forEach(cardId => removeCard(getCardById(cardId)))
    dispatch(deleteColumn(column))
  }

  const renameColumn = (column, newName) => {
    const updatedColumn = { ...column, name: newName }
    dispatch(updateColumn(updatedColumn))
  }

  const enableDrop = column => {
    const updatedColumn = { ...column }
    dispatch(updateColumn(updatedColumn))
  }

  const addCardToColumn = (column, cardId) => {
    const newCards = column.cards.concat(cardId)
    const updatedColumn = { ...column, cards: newCards }
    dispatch(updateColumn(updatedColumn))
  }

  const removeCardFromColumn = (column, cardId) => {
    const newCards = column.cards.filter(id => id !== cardId)
    const updatedColumn = { ...column, cards: newCards }
    dispatch(updateColumn(updatedColumn))
  }

  const setColumnMaxCards = (column, newMax) => {
    const updatedColumn = {
      ...column,
      maxCards: newMax,
    }
    dispatch(updateColumn(updatedColumn))
  }

  const swapCardsInColumn = (column, sourceIndex, destIndex) => {
    const newCards = Array.from(column.cards)
    const [card] = newCards.splice(sourceIndex, 1)
    newCards.splice(destIndex, 0, card)
    const updatedColumn = {
      ...column,
      cards: newCards,
    }
    dispatch(updateColumn(updatedColumn))
  }

  const swapCardBetweenColumns = (
    sourceColumn,
    destColumn,
    sourceIndex,
    destIndex
  ) => {
    const newSourceColumnCards = Array.from(sourceColumn.cards)
    const newDestColumnCards = Array.from(destColumn.cards)

    const [card] = newSourceColumnCards.splice(sourceIndex, 1)
    newDestColumnCards.splice(destIndex, 0, card)

    const updatedSourceColumn = {
      ...sourceColumn,
      cards: newSourceColumnCards,
    }
    const updatedDestColumn = {
      ...destColumn,
      cards: newDestColumnCards,
    }
    dispatch(updateColumn(updatedSourceColumn))
    dispatch(updateColumn(updatedDestColumn))
  }

  return {
    getColumns,
    getColumnById,
    createColumn,
    removeColumn,
    renameColumn,
    enableDrop,
    addCardToColumn,
    removeCardFromColumn,
    setColumnMaxCards,
    swapCardsInColumn,
    swapCardBetweenColumns,
  }
}

export default useColumnUtil
