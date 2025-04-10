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

async function addBook(author, name, publisher, anotation, added_by, cover_url) {
  try {
    const [addedBook] = await db('books').insert({ author, name, publisher, anotation, added_by, cover_url }).returning('*');
    return addedBook;
  } catch (e) {
    console.log('Ошибка при записи книги в базу, e = ', e);
    throw e;
  }
}

async function editBook(id, author, name, publisher, anotation, cover_url) {
  try {
    const [addedBook] = await db('books').where({ id }).update({ author, name, publisher, anotation, cover_url }).returning('*');
    return addedBook;
  } catch (e) {
    console.log('Ошибка при редактировании книги в базe, e = ', e);
    throw e;
  }
}

async function filterBooks(field, filtered_value) {
  try {
    if (field === 'year') {
      return await db('books').whereRaw("split_part(publisher, ', ', 2) = ?", [filtered_value]);
    } else {
      const filteredBooks = await db('books').where({ [field]: filtered_value });
      return filteredBooks;
    }
  } catch (e) {
    console.log('Ошибка при редактировании книги в базe, e = ', e);
    throw e;
  }
}

module.exports = { getAllBooks, addBook, editBook, filterBooks };
