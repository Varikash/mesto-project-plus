import { TDefaultUserInputs, ErrorsObject } from './types';

export const defaultUserInputs: TDefaultUserInputs = {
  name: 'Жак-Ив Кусто',
  about: 'Исследователь',
  avatar: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
};

export const errorResponses: ErrorsObject = {
  invalidDataError: {
    code: 400,
    message: 'Использованы некорректные данные',
  },
  authenticationRequiredError: {
    code: 401,
    message: 'Необходимо пройти авторизацию',
  },
  accessDeniedError: {
    code: 403,
    message: 'У вас нет прав на это действие',
  },
  resourceNotFoundError: {
    code: 404,
    message: 'Запрашиваемые данные не найдены',
  },
  emailConflictError: {
    code: 409,
    message: 'Данный е-mail уже используется',
  },
  internalServerError: {
    code: 500,
    message: 'Ошибка сервера',
  },
};

export const NOT_FOUND_ERROR_MESSAGE = 'Такой пользователь не найден';
export const NOT_VALID_EMAIL_OR_PASSWORD = 'Неправильные почта или пароль';

export const STATUS_OK: number = 200;
export const STATUS_CREATED: number = 201;
