export interface IUser {
  id?: string;
  name?: string;
  email: string;
  password?: string;
  token?: string;
}

export interface IMessage {
  id?: string;
  text: string;
  author: string;
  date: string;
}

export interface IChat {
  _id?: string;
  name: string;
  surName: string;
  messages: IMessage[];
}
