const db = require('../db');

async function addUser(email, first_name, last_name, login, password) {
  try {
    const [user] = await db('users')
      .insert({
        email,
        first_name,
        last_name,
        login,
        password,
      })
      .returning('*');

    return user;
  } catch (e) {
    if (e.code === '23505') {
      if (e.detail.includes('email')) {
        throw new Error('Этот email уже используется');
      }
      if (e.detail.includes('login')) {
        throw new Error('Этот логин уже используется');
      }
    }
    console.error('Ошибка при добавлении пользователя:', e);
    throw e;
  }
}

module.exports = { addUser };
