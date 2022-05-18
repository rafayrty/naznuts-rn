export interface User {
  blocked: boolean;
  confirmed: boolean;
  createdAt: Date;
  email: string;
  fullname: string;
  id: number;
  phone: string;
  provider: string;
  updatedAt: Date;
  username: string;
}

export interface LoggedUser {
  jwt: string;
  user: User;
}
