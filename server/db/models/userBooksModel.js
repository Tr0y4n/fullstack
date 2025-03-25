const db = require('../db');

async function saveBookToUser(user_id, book_id) {
  try {
    const [entry] = await db('user_books').insert({ user_id, book_id }).returning('*');
    return entry;
  } catch (e) {
    console.error('Ошибка при сохранении книги пользователю:', e);
    throw e;
  }
}

async function getSavedBooksForUser(user_id) {
  try {
    const books = db('books').join('user_books', 'books.id', 'user_books.book_id').where('user_books.user_id', user_id).select('books.*');
    return books;
  } catch (e) {
    console.error('Ошибка при получении книг пользователя:', e);
    throw e;
  }
}

async function deleteUsersBook(user_id, book_id) {
  try {
    await db('user_books').where({ user_id, book_id }).del();
  } catch (e) {
    console.log('Ошибка при удалении книги из базы, e = ', e);
    throw e;
  }
}

module.exports = { saveBookToUser, getSavedBooksForUser, deleteUsersBook };
