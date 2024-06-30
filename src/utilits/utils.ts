// import mongoose from 'mongoose';

type TWebError = {
  error: number,
  message: string,
};

export const serverError:TWebError = {
  error: 500,
  message: 'Ошибка сервера',
};

export const badRequestError:TWebError = {
  error: 400,
  message: 'Некорректные данные',
};

export const STATUS_OK: number = 200;
export const STATUS_CREATED: number = 201;

export const notFoundError:TWebError = {
  error: 404,
  message: 'Запрашиваемая страница не найдена',
};

// 400 — переданы некорректные данные в методы создания карточки, пользователя,
// 404 — карточка или пользователь не найден или был запрошен несуществующий роут;
// 500 — ошибка по умолчанию. Сопровождается сообщением: «На сервере произошла ошибка».
