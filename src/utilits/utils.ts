// import mongoose from 'mongoose';
import { TWebError } from './types';

export const notFoundError: TWebError = {
  error: 404,
  message: 'Запрашиваемая страница не найдена',
};
