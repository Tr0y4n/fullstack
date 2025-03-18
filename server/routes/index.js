const express = require('express');
const { addUser } = require('../db/models/userModel');

const router = express.Router();

router.post('/users', async (req, res) => {
  const { email, first_name, last_name, login, password } = req.body;

  if (!email || !first_name || !last_name || !login || !password) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }

  try {
    const user = await addUser(email, first_name, last_name, login, password);
    res.status(201).json(user);
  } catch (e) {
    console.error('Ошибка при добавлении пользователя:', e);
    if (e.message === 'Этот email уже используется' || e.message === 'Этот логин уже используется') {
      return res.status(409).json({ message: e.message });
    }
    res.status(500).json({ message: 'Произошла ошибка сервера', error: e.message });
  }
});

module.exports = router;
