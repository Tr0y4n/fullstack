import React, { useEffect, useState } from 'react';
import styles from './Catalog.module.scss';
import app from '@/api/api';
import { BookCard } from '@/shared';
import { Box, Button, Modal } from '@mui/material';
import { ModalModule } from './ModalModule/ModalModule';
import { BooksData } from './Catalog.types';

export const Catalog: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [booksList, setBooksList] = useState<Array<BooksData>>([]);
  console.log('booksList -- ', booksList);

  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!user;

  useEffect(() => {
    const getBooks = async () => {
      try {
        const { data } = await app.books.getAllBooks();
        setBooksList(data);
      } catch (e) {
        console.log('Ошибка при получении книг каталога ', e);
      }
    };
    getBooks();
  }, []);

  return (
    <div className={styles.layout}>
      <Box sx={{ width: '100%', height: 50, background: '#ddedf0', marginBottom: '10px', display: 'flex', alignItems: 'center', padding: '10px' }}>
        {isLoggedIn && (
          <Button variant="outlined" size="small" sx={{ height: 35, borderRadius: '10px', backgroundColor: 'white' }} onClick={() => setIsModalOpen(true)}>
            Добавить
          </Button>
        )}
        <Box sx={{ marginLeft: '700px' }}>ТИПА ТАМ ПОИСК ФИЛЬТРЫ И ВСЯ ХУЙНЯ</Box>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {booksList?.map((item) => (
          <BookCard data={item} isLoggedIn={isLoggedIn} isSaved={false} />
        ))}
      </Box>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <ModalModule user={user} setBooksList={setBooksList} setIsModalOpen={setIsModalOpen} />
        </Box>
      </Modal>
    </div>
  );
};
