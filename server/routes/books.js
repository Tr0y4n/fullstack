const { getAllBooks, addBook, editBook } = require('../db/models/booksModel');
const { getSavedBooksForUser, saveBookToUser, deleteUsersBook } = require('../db/models/userBooksModel');

const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    // Делаем имя файла уникальным
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

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

router.post('/', upload.single('cover'), async (req, res) => {
  const { author, name, publisher, anotation, added_by } = req.body;
  const coverPath = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const addedBook = await addBook(author, name, publisher, anotation, added_by, coverPath);
    res.status(200).json(addedBook);
  } catch (e) {
    console.log('Ошибка при записи книги: ', e);
    res.status(500).json({ message: 'Произошла ошибка сервера', error: e.message });
  }
});

router.put('/', upload.single('cover'), async (req, res) => {
  const { id, author, name, publisher, anotation } = req.body;
  const coverPath = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const saved = await editBook(id, author, name, publisher, anotation, coverPath);
    res.status(201).json({ message: 'Книга успешно отредактирована', saved });
  } catch (e) {
    console.log('Ошибка при редактировании книги:', e);
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
