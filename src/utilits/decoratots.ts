import User, { IUser } from '../models/user';

export default async function updateUserFields(userId: string, update: Partial<IUser>) {
  const updateUser = await User.findByIdAndUpdate(
    userId,
    update,
    { new: true, runValidators: true },
  ).orFail();
  if (!updateUser) {
    throw new Error('User not found');
  }
  return updateUser;
}
