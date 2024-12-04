import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import updateUserFields from '../utilits/decoratots';
import InvalidDataError from '../errors/InvalidDataError';
import ResourceError from '../errors/ResourceError';
import AuthError from '../errors/AuthError';
import {
  errorResponses, NOT_FOUND_ERROR_MESSAGE, STATUS_CREATED, STATUS_OK,
} from '../utilits/constants';
import ConflictError from '../errors/ConflictError';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hashedPassword,
    });

    const userResponse = {
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    };

    return res.status(STATUS_CREATED).send(userResponse);
  } catch (error: any) {
    if (error.code === 11000) {
      const conflictError = new ConflictError(errorResponses.emailConflictError.message);
      return next(conflictError);
    }
    if (error instanceof mongoose.Error.ValidationError) {
      const validationError = new InvalidDataError(errorResponses.invalidDataError.message, error);
      return next(validationError);
    }
    return next(error);
  }
};

export const getUsers = (_req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((error) => next(error));
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).orFail();
    return res.status(STATUS_OK).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const badRequestErrorInstance = new InvalidDataError(errorResponses.invalidDataError.message, error);
      return next(badRequestErrorInstance);
    }
    return next(error);
  }
};

export const updateUserInfo = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    const { name, about } = req.body;
    const currentUser = req.user._id;
    const updatedUser = await updateUserFields(currentUser, { name, about });
    return res.status(STATUS_OK).send(updatedUser);
  } catch (error) {
    const { message } = error as Error;
    if (error instanceof mongoose.Error.ValidationError) {
      const validationError = new InvalidDataError(errorResponses.invalidDataError.message, error);
      return next(validationError);
    } if (message === NOT_FOUND_ERROR_MESSAGE) {
      const notFoundError = new ResourceError(errorResponses.resourceNotFoundError.message);
      return next(notFoundError);
    }
    return next(error);
  }
};

export const updateUserAvatar = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    const { avatar } = req.body;
    const currentUser = req.user._id;
    const updatedUser = await updateUserFields(currentUser, { avatar });
    return res.status(STATUS_OK).send(updatedUser);
  } catch (error) {
    const { message } = error as Error;
    if (error instanceof mongoose.Error.ValidationError) {
      const validationError = new InvalidDataError(errorResponses.invalidDataError.message, error);
      return next(validationError);
    } if (message === NOT_FOUND_ERROR_MESSAGE) {
      const notFoundError = new ResourceError(errorResponses.resourceNotFoundError.message);
      return next(notFoundError);
    }
    return next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials(email, password);
    res.send({
      token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }),
    });
  } catch (err) {
    if (!(err instanceof AuthError)) {
      // @ts-ignore
      // eslint-disable-next-line no-ex-assign
      err = new AuthError(err.message);
    }
    next(err);
  }
};

export const getCurrentUser = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    const currentUser = req.user._id;
    const user = await User.findById(currentUser).orFail();
    return res.status(STATUS_OK).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const validationError = new InvalidDataError(errorResponses.invalidDataError.message, error);
      return next(validationError);
    }
    return next(error);
  }
};
