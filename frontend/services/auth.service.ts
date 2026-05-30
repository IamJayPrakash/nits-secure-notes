import api from "./api";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const authService = {
  login: async (
    payload: LoginPayload
  ): Promise<ApiResponse<{ token: string; refreshToken: string; user: AuthUser }>> => {
    const res = await api.post<ApiResponse<{ token: string; refreshToken: string; user: AuthUser }>>(
      "/auth/login",
      payload
    );
    return res.data;
  },

  register: async (payload: RegisterPayload): Promise<ApiResponse<AuthUser>> => {
    const res = await api.post<ApiResponse<AuthUser>>("/auth/register", payload);
    return res.data;
  },

  logout: async (): Promise<ApiResponse<void>> => {
    const res = await api.post<ApiResponse<void>>("/auth/logout");
    return res.data;
  },
};
