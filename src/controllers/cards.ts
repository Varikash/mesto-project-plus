import mongoose from 'mongoose';
import { Request, Response } from 'express';
import Card from '../models/card';
import {
  STATUS_CREATED,
  STATUS_OK, serverError,
  badRequestError,
  notFoundError,
} from '../utilits/utils';

export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find({});
    return res.status(STATUS_OK).send(cards);
  } catch (error) {
    return res.status(serverError.error).send({ message: serverError.message });
  }
};

export const createCard = async (req: Request | any, res: Response) => {
  try {
    const ownerId = req.user._id;
    const card = await Card.create({ name: req.body.name, link: req.body.link, owner: ownerId });
    return res.status(STATUS_CREATED).send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(badRequestError.error).send({ message: badRequestError.message });
    }
    return res.status(serverError.error).send({ message: serverError.error });
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndRemove(cardId);

    if (!card) {
      return res.status(notFoundError.error).send({ message: notFoundError.message });
    }
    return res.status(STATUS_OK).send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(badRequestError.error).send({ message: badRequestError.message });
    }
    return res.status(serverError.error).send({ message: serverError.message });
  }
};

export const likeCard = async (req: Request | any, res: Response) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      return res.status(notFoundError.error).send({ message: notFoundError.message });
    }
    return res.send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(badRequestError.error).send({ message: badRequestError.message });
    }
    return res.status(serverError.error).send({ message: serverError.message });
  }
};

export const dislikeCard = async (req: Request | any, res: Response) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      return res.status(notFoundError.error).send({ message: notFoundError.message });
    }

    return res.send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res
        .status(badRequestError.error)
        .send({ message: badRequestError.message });
    }

    return res.status(serverError.error).send({ message: serverError.message });
  }
};
