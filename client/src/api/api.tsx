import axiosInstance from './axiosInstance';

const app = {
  users: {
    addUser: async (userData) => {
      const response = await axiosInstance.post(`/users`, userData);
      return response;
    },
    getAll: async () => {
      const response = await axiosInstance.get('/users');
      return response;
    },
    logIn: async (body) => {
      const response = await axiosInstance.post('/users/login', body);
      return response;
    },
    editUser: async (body) => {
      const response = await axiosInstance.put('/users', body);
      return response;
    },
    deleteUser: async (params) => {
      const response = await axiosInstance.delete(`/users/${params}`);
      return response;
    },
  },
};

export default app;
