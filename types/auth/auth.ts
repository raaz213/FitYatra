export interface User {
  name: string;
  email: string;
  password: string;
  gender: "male" | "female" | "other";
  age: number;
  height: number;
  weight: number;
  image?: string;
  role: string;
}

export interface LoginReq {
  email: string;
  password: string;
}
export interface LoginRes {
  token: string;
  user: User;
  message: string;
}
export interface UpdateUserReq {
  name: string;
  email: string;
  password: string;
  age: number;
  height: number;
  weight: number;
}
