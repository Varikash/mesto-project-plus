import mongoose from 'mongoose';
import { Request, Response } from 'express';
import User from '../models/user';
import {
  STATUS_CREATED,
  STATUS_OK,
  serverError,
  badRequestError,
  notFoundError,
} from '../utilits/utils';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    return res.status(STATUS_CREATED).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(badRequestError.error).send({ message: badRequestError.message });
    }
    return res.status(serverError.error).send({ message: serverError.message });
  }
};

export const getUsers = (req: Request, res: Response) => User.find({})
  .then((users) => res.send(users))
  .catch(() => res.status(serverError.error).send({ message: serverError.message }));

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(notFoundError.error).send({ message: notFoundError.message });
    }
    return res.status(STATUS_OK).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res
        .status(badRequestError.error).send({ message: badRequestError.message });
    }
    return res.status(serverError.error).send({ message: serverError.message });
  }
};

export const updateUserInfo = async (req: Request | any, res: Response) => {
  try {
    const { name, about } = req.body;
    const currentUser = req.user._id;
    const updatedUser = await User.findByIdAndUpdate(
      currentUser,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      return res.status(notFoundError.error).send({ message: notFoundError.message });
    }
    return res.status(STATUS_OK).send(updatedUser);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(badRequestError.error).send({ message: badRequestError.message });
    }
    return res.status(serverError.error).send({ message: serverError.message });
  }
};

export const updateUserAvatar = async (req: Request | any, res: Response) => {
  try {
    const { avatar } = req.body;
    const currentUser = req.user._id;
    const updatedUser = await User.findByIdAndUpdate(
      currentUser,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      return res.status(notFoundError.error).send({ message: notFoundError.message });
    }
    return res.status(STATUS_OK).send(updatedUser);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(badRequestError.error).send({ message: badRequestError.message });
    }
    return res.status(badRequestError.error).send({ message: badRequestError.message });
  }
};
