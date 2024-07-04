import {
  model, Schema, Model, Document,
} from 'mongoose';
import bcrypt from 'bcrypt';
import {defaultUserInputs, NOT_VALID_EMAIL_OR_PASSWORD} from '../utilits/constants';
import { emailValidation, urlValidation } from '../utilits/validation';
import AuthError from '../errors/AuthError';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

interface UserModel extends Model<IUser> {
  findUserByCredentials: (
    email: string,
    password: string
  ) => Promise<Document<unknown, any, IUser>>;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: false,
    default: defaultUserInputs.name,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: false,
    default: defaultUserInputs.about,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    required: false,
    default: defaultUserInputs.avatar,
    validate: urlValidation,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: emailValidation,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
},
{ versionKey: false },
);

userSchema.static(
  'findUserByCredentials',
  function findUserByCredentials(email: string, password: string): Promise<IUser | null> {
    return this.findOne({ email }).select('+password')
      .then((user: IUser | null) => {
        if (!user || !user.password) {
          throw new AuthError(NOT_VALID_EMAIL_OR_PASSWORD);
        }

        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              throw new AuthError(NOT_VALID_EMAIL_OR_PASSWORD);
            }
            return user;
          });
      });
  },
);

export default model<IUser, UserModel>('user', userSchema);
