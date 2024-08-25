export interface IUser {
  _id?: string;
  name?: string;
  email: string;
  password?: string;
  token?: string;
}

export interface IMessage {
  _id?: string;
  text: string;
  author: string;
  date: string;
  createdAt?: string;
}

export interface IChat {
  _id?: string;
  name: string;
  surName: string;
  avatar?: string;
  lastMessage?: string;
}
