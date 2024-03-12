export type Option = {
  votes: string[];
  text: string;
};

export type Question = {
  id: string;
  author: string;
  timestamp: number;
  optionOne: Option;
  optionTwo: Option;
};

export type User = {
  id: string;
  password: string;
  name: string;
  avatarURL: string;
  answers: { [key: string]: string };
  questions: Array<string>;
};

export type Users = {
  [key: string]: User;
};

export type Questions = {
  [key: string]: Question;
};

export type State = {
  questions: Questions;
  authedUser: string;
  users: Users;
};

export type AuthedUser = {
  id?: string;
  name?: string;
};

export type NewQuestion = {
  optionOneText: string;
  optionTwoText: string;
  author: string;
};
