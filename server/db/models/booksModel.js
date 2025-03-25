const db = require('../db');

async function getAllBooks() {
  try {
    const books = await db('books').select('*');
    return books;
  } catch (e) {
    console.log('Ошибка при получении книг из базы, e = ', e);
    throw e;
  }
}

async function addBook(author, name, publisher, anotation, added_by) {
  try {
    const [addedBook] = await db('books').insert({ author, name, publisher, anotation, added_by }).returning('*');
    return addedBook;
  } catch (e) {
    console.log('Ошибка при записи книги в базу, e = ', e);
    throw e;
  }
}

async function editBook(id, author, name, publisher, anotation) {
  try {
    const [addedBook] = await db('books').where({ id }).update({ author, name, publisher, anotation }).returning('*');
    return addedBook;
  } catch (e) {
    console.log('Ошибка при редактировании книги в базe, e = ', e);
    throw e;
  }
}

module.exports = { getAllBooks, addBook, editBook };
