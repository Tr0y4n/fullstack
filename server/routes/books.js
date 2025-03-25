const express = require('express');
const { getAllBooks, addBook, editBook } = require('../db/models/booksModel');
const { getSavedBooksForUser, saveBookToUser, deleteUsersBook } = require('../db/models/userBooksModel');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const books = await getAllBooks();
    res.status(200).json(books);
  } catch (e) {
    console.log('Ошибка при получении данных по всем книгам: ', e);
    res.status(500).json({ message: 'Произошла ошибка сервера', error: e.message });
  }
});

router.post('/', async (req, res) => {
  const { author, name, publisher, anotation, added_by } = req.body;
  try {
    const addedBook = await addBook(author, name, publisher, anotation, added_by);
    res.status(200).json(addedBook);
  } catch (e) {
    console.log('Ошибка при записи книги: ', e);
    res.status(500).json({ message: 'Произошла ошибка сервера', error: e.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const books = await getSavedBooksForUser(id);
    res.status(200).json(books);
  } catch (e) {
    console.log('Ошибка при получении данных по всем книгам пользователя: ', e);
    res.status(500).json({ message: 'Произошла ошибка сервера', error: e.message });
  }
});

router.post('/:id/save', async (req, res) => {
  const { id } = req.params;
  const { book_id } = req.body;

  if (!book_id) {
    return res.status(400).json({ message: 'book_id обязателен' });
  }

  try {
    const saved = await saveBookToUser(id, book_id);
    res.status(201).json({ message: 'Книга успешно сохранена', saved });
  } catch (e) {
    console.log('Ошибка при сохранении книги пользователю:', e);
    res.status(500).json({ message: 'Произошла ошибка сервера', error: e.message });
  }
});

router.put('/', async (req, res) => {
  const { id, author, name, publisher, anotation } = req.body;
  try {
    const saved = await editBook(id, author, name, publisher, anotation);
    res.status(201).json({ message: 'Книга успешно отредактирована', saved });
  } catch (e) {
    console.log('Ошибка при редактировании книги:', e);
    res.status(500).json({ message: 'Произошла ошибка сервера', error: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id: user_id } = req.params;
  const { book_id } = req.body;

  try {
    await deleteUsersBook(user_id, book_id);
    res.status(200).json({ message: 'Книга успешно удалёна' });
  } catch (e) {
    console.log('Ошибка при удалении книги: ', e);
    res.status(500).json({ message: 'Произошла ошибка сервера', error: e.message });
  }
});

module.exports = router;
