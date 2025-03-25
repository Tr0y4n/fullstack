import React, { useEffect, useState } from 'react';
import styles from './MyBooks.module.scss';
import app from '@/api/api';
import { BookCard } from '@/shared';
import { Box, Modal } from '@mui/material';
import { ModalModule } from './ModalModule/ModalModule';
import { BooksData } from '../Catalog/Catalog.types';

export const MyBooks: React.FC = () => {
  const [modalData, setModalData] = useState<null | BooksData>(null);
  const [booksList, setBooksList] = useState<Array<BooksData>>([]);

  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!user;

  useEffect(() => {
    const getBooks = async () => {
      try {
        const { data } = await app.books.getUsersBooks(user?.id);
        setBooksList(data);
      } catch (e) {
        console.log('Ошибка при получении сохраненных книг пользователя ', e);
      }
    };
    getBooks();
  }, []);

  return (
    <div className={styles.layout}>
      <Box sx={{ width: '100%', height: 50, background: '#ddedf0', marginBottom: '10px', display: 'flex', alignItems: 'center', padding: '10px' }}>
        <Box sx={{ marginLeft: '800px' }}>ТИПА ТАМ ПОИСК ФИЛЬТРЫ И ВСЯ ХУЙНЯ</Box>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {booksList?.map((item) => (
          <BookCard data={item} isLoggedIn={isLoggedIn} isSaved={true} setModalData={setModalData} setBooksList={setBooksList} />
        ))}
      </Box>
      <Modal open={!!modalData} onClose={() => setModalData(null)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <ModalModule setBooksList={setBooksList} setModalData={setModalData} modalData={modalData} />
        </Box>
      </Modal>
    </div>
  );
};
