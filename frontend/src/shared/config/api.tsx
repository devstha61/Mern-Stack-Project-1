import axiosInstance from './axiosinstance';

interface AuthPayload {
  username: string;
  password: string;
}

interface RegisterPayload extends AuthPayload {
  email: string;
}

export const loginApi = (data: AuthPayload) => {
  return axiosInstance.post('/auth/login', data);
};

export const registerApi = (data: RegisterPayload) => {
  return axiosInstance.post('/auth/register', data);
};
