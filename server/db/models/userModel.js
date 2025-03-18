const db = require('../db');

async function addUser(email, first_name, last_name) {
  try {
    const [user] = await db('users')
      .insert({
        email,
        first_name,
        last_name,
      })
      .returning('*');

    return user;
  } catch (e) {
    console.error('Ошибка при добавлении пользователя:', err);
    throw err;
  }
}

module.exports = { addUser };
