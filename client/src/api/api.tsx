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
  books: {
    getAllBooks: async () => {
      const response = await axiosInstance.get('/books');
      return response;
    },
    addBook: async (formData) => {
      const response = await axiosInstance.post('/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // обязательно
        },
      });
      return response;
    },
    editBook: async (formData) => {
      const response = await axiosInstance.put('/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // обязательно
        },
      });
      return response;
    },
    getUsersBooks: async (user_id) => {
      const response = await axiosInstance.get(`/books/${user_id}`);
      return response;
    },
    saveBookToUser: async (user_id, body) => {
      const response = await axiosInstance.post(`/books/${user_id}/save`, body);
      return response;
    },
    deleteUsersBook: async (user_id, body) => {
      const response = await axiosInstance.delete(`/books/${user_id}`, { data: body });
      return response;
    },
  },
};

export default app;
