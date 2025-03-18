import axiosInstance from './axiosInstance';

const app = {
  user: {
    addUser: async (userData) => {
      const response = await axiosInstance.post(`/users`, userData);
      return response.data;
    },
  },
};

export default app;
