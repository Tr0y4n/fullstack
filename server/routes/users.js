const express = require('express');
const { addUser, getAllUsers, userLogIn, editUser, deleteUser } = require('../db/models/userModel');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, first_name, last_name, login, password, admin } = req.body;

  if (!email || !first_name || !last_name || !login || !password) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }

  try {
    const user = await addUser(email, first_name, last_name, login, password, admin);
    res.status(201).json(user);
  } catch (e) {
    console.error('Ошибка при добавлении пользователя:', e);
    if (e.message === 'Этот email уже используется' || e.message === 'Этот логин уже используется') {
      return res.status(409).json({ message: e.message });
    }
    res.status(500).json({ message: 'Произошла ошибка сервера', error: e.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(201).json(users);
  } catch (e) {
    console.error('Ошибка при получении всех пользователей:', e);
    res.status(500).json({ message: 'Произошла ошибка сервера', error: e.message });
  }
});

router.post('/login', async (req, res) => {
  const { login, password } = req.body;
  try {
    const userData = await userLogIn(login, password);
    res.status(201).json(userData);
  } catch (e) {
    console.error('Ошибка при аутентификации:', e);
    res.status(500).json({ message: e.message });
  }
});

router.put('/', async (req, res) => {
  const { id, ...newData } = req.body;
  try {
    const editedUser = await editUser(id, newData);
    res.status(201).json(editedUser);
  } catch (e) {
    console.error('Ошибка при обновлении пользователя:', e);
    res.status(500).json({ message: 'Произошла ошибка сервера', error: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUser(id);
    res.status(200).json({ message: 'Пользователь успешно удалён' });
  } catch (e) {
    console.log('Ошибка при удалении пользователя: ', e);
    res.status(500).json({ message: 'Произошла ошибка сервера', error: e.message });
  }
});

module.exports = router;
