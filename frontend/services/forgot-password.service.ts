import api from "./api";

export const forgotPasswordService = {
  send: async (email: string): Promise<{ success: boolean; message: string }> => {
    const res = await api.post("/forgot-password", { email });
    return res.data;
  },
};
