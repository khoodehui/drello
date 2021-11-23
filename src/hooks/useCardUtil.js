import { v4 as uuid } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCard, newCard, updateCard } from '../reducers/cardsReducer'

// hook that provides utility functions with respect to cards
const useCardUtil = () => {
  const cards = useSelector(state => state.cards)
  const dispatch = useDispatch()

  const getCards = () => cards

  const getCardById = id => cards[id]

  const createCard = content => {
    const card = {
      id: uuid(),
      content,
    }
    dispatch(newCard(card))
    return card
  }

  const removeCard = card => dispatch(deleteCard(card))

  const updateCardContent = (card, newContent) => {
    const updatedCard = { ...card, content: newContent }
    dispatch(updateCard(updatedCard))
  }

  return {
    getCards,
    getCardById,
    createCard,
    removeCard,
    updateCardContent,
  }
}

export default useCardUtil
