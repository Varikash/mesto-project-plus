import User, { IUser } from '../models/user';
import { NOT_FOUND_ERROR_MESSAGE } from './constants';

export default async function updateUserFields(userId: string, update: Partial<IUser>) {
  const updateUser = await User.findByIdAndUpdate(
    userId,
    update,
    { new: true, runValidators: true },
  ).orFail();
  if (!updateUser) {
    throw new Error(NOT_FOUND_ERROR_MESSAGE);
  }
  return updateUser;
}
