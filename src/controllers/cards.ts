import mongoose from 'mongoose';
import {
  NextFunction, Request, RequestHandler, Response,
} from 'express';
import Card from '../models/card';
import { errorResponses, STATUS_OK, STATUS_CREATED } from '../utilits/constants';
import ResourceError from '../errors/ResourceError';
import ServerError from '../errors/ServerError';
import InvalidDataError from '../errors/InvalidDataError';
import AccessError from '../errors/AccessError';

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({}).orFail(new ResourceError(errorResponses.resourceNotFoundError.message));
    return res.status(STATUS_OK).send(cards);
  } catch (error) {
    const serverErrorInstance = new ServerError(errorResponses.internalServerError.message);
    return next(serverErrorInstance);
  }
};

export const createCard = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    const ownerId = req.user._id;
    const card = await Card.create({ name: req.body.name, link: req.body.link, owner: ownerId });
    return res.status(STATUS_CREATED).send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const validationError = new InvalidDataError(errorResponses.invalidDataError.message, error);
      return next(validationError);
    }
    // eslint-disable-next-line max-len
    const serverErrorInstance = new ServerError(errorResponses.internalServerError.message, (error instanceof Error) ? error : undefined);
    return next(serverErrorInstance);
  }
};

export const deleteCard: RequestHandler = async (req: Request | any, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  try {
    const card = await Card.findOne({ _id: cardId })
      .orFail(new ResourceError(errorResponses.resourceNotFoundError.message));

    if (String(card.owner) !== userId) {
      return next(new AccessError(errorResponses.accessDeniedError.message));
    }

    await Card.deleteOne({ _id: cardId });

    return res.status(STATUS_OK).send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const validationError = new InvalidDataError(errorResponses.invalidDataError.message, error);
      return next(validationError);
    }
    return next(error);
  }
};

export const likeCard = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail(new ResourceError(errorResponses.resourceNotFoundError.message));
    return res.send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const validationError = new InvalidDataError(errorResponses.invalidDataError.message, error);
      return next(validationError);
    }
    // eslint-disable-next-line max-len
    const serverErrorInstance = new ServerError(errorResponses.internalServerError.message, error instanceof Error ? error : undefined);
    return next(serverErrorInstance);
  }
};

export const dislikeCard = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail(new ResourceError(errorResponses.resourceNotFoundError.message));
    return res.send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const validationError = new InvalidDataError(errorResponses.invalidDataError.message, error);
      return next(validationError);
    }
    // eslint-disable-next-line max-len
    const serverErrorInstance = new ServerError(errorResponses.internalServerError.message, error instanceof Error ? error : undefined);
    return next(serverErrorInstance);
  }
};
