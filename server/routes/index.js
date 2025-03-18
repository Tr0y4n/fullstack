const express = require('express');
const { addUser } = require('../db/models/userModel');

const router = express.Router();

router.post('/users', async (req, res) => {
  const { email, first_name, last_name } = req.body;

  if (!email || !first_name || !last_name) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }

  try {
    const user = await addUser(email, first_name, last_name);
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ message: 'Произошла ошибка сервера', error: e.message });
  }
});

module.exports = router;
