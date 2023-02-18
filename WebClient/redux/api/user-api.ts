import { instance } from "./index";

export type LoginRequest = {
  email: string;
  password: string;
}

export type UserResponse = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

export type CreateUserRequest = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export const UserApi = {
  async register(request: CreateUserRequest): Promise<UserResponse> {
    const { data } = await instance.post('/authentication/register', request);
    return data;
  },
  async login(request: LoginRequest): Promise<UserResponse> {
    const { data } = await instance.post('/authentication/login', request);
    console.log(data);
    return data;
  },
  async getUser(token: string): Promise<UserResponse> {
    const { data } = await instance.get(`/authentication/user?token=${token}`);
    console.log(data);
    return data;
  }
};