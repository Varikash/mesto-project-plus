import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';
import { cardIdValidation, newCardValidation } from '../utilits/validation';

const router = Router();

router.get('/', getCards);

router.post('/', newCardValidation, createCard);
router.delete('/:cardId', cardIdValidation, deleteCard);

router.put('/:cardId/likes', cardIdValidation, likeCard);
router.delete('/:cardId/likes', cardIdValidation, dislikeCard);

export default router;
