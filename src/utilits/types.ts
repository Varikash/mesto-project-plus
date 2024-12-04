export type TDefaultUserInputs = {
  name: string,
  about: string,
  avatar: string,
};

export type TWebError = {
  error: number,
  message: string,
};

export interface ErrorObject {
  code: number;
  message: string;
}

export interface ErrorsObject {
  [key: string]: ErrorObject;
}
