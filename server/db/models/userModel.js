const db = require('../db');

async function addUser(email, first_name, last_name, login, password, admin) {
  try {
    const [user] = await db('users')
      .insert({
        email,
        first_name,
        last_name,
        login,
        password,
        admin,
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

async function getAllUsers() {
  try {
    const allUsers = await db('users').select('*');
    return allUsers;
  } catch (e) {
    console.error('Ошибка при получении всех пользователей:', e);
    throw e;
  }
}

async function userLogIn(login, password) {
  try {
    const loggedUser = await db('users').where({ login: login, password: password }).first();

    if (!loggedUser) {
      throw new Error('Неправильный логин или пароль');
    }

    const { password: _, ...userData } = loggedUser;
    return userData;
  } catch (e) {
    console.error('Ошибка аутентифкации:', e);
    throw e;
  }
}

async function editUser(id, userData) {
  try {
    const [editedUser] = await db('users').where({ id }).update(userData).returning('*');
    return editedUser;
  } catch (e) {
    console.log('Ошибка при изменении пользователя: ', e);
    throw e;
  }
}

async function deleteUser(id) {
  try {
    await db('users').where({ id }).del();
  } catch (e) {
    console.log('Ошибка при удалении пользователя: ', e);
    throw e;
  }
}

module.exports = { addUser, getAllUsers, userLogIn, editUser, deleteUser };
