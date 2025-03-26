import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Menu, MenuItem, IconButton } from '@mui/material';
import { BookCardProps } from './BookCard.types';
import IMG from './vor.png';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import styles from './BookCard.module.scss';
import app from '@/api/api';

const BASE_URL = 'http://localhost:5000';

export const BookCard: React.FC<BookCardProps> = ({ data, isLoggedIn, isSaved, setModalData, setBooksList }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSave = async () => {
    try {
      const user_id = user?.id;
      console.log('data ==== ', data);
      const body = { book_id: data.id };
      await app.books.saveBookToUser(user_id, body);
      handleClose();
    } catch (e) {
      console.log('Ошибка при сохранении книги в избранное: ', e);
    }
  };

  const handleEdit = () => {
    setModalData && setModalData(data);
    handleClose();
  };

  const handleDelete = async () => {
    try {
      const user_id = user?.id;
      const body = {
        book_id: data.id,
      };
      await app.books.deleteUsersBook(user_id, body);
      setBooksList && setBooksList((prevState) => prevState.filter((item) => item.id !== data.id));
    } catch (e) {
      console.log('Ошибка при удалении книги из избранного: ', e);
    }
    handleClose();
  };

  return (
    <Card className={styles.layout} sx={{ width: 400, height: 180, display: 'flex', flexDirection: 'row' }}>
      <CardMedia component="img" sx={{ width: '33%' }} image={`${BASE_URL}${data?.cover_url}` || IMG} />
      <CardContent className={styles.cardContent} sx={{ width: '67%', padding: '5px' }}>
        <Typography
          gutterBottom
          sx={{
            color: 'text.secondary',
            width: '100%',
            fontSize: 14,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {data.author}
          {isLoggedIn && (
            <IconButton onClick={handleMenuClick} size="small">
              <DensityMediumIcon sx={{ color: 'black', fontSize: 16 }} />
            </IconButton>
          )}
        </Typography>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {!isSaved && <MenuItem onClick={handleSave}>Сохранить</MenuItem>}
          {isSaved && <MenuItem onClick={handleEdit}>Редактировать</MenuItem>}
          {isSaved && <MenuItem onClick={handleDelete}>Удалить</MenuItem>}
        </Menu>
        <Typography variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1, fontSize: 12 }}>{data.publisher}</Typography>
        <Typography
          variant="body2"
          sx={{
            height: '80px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {data.anotation}
        </Typography>
      </CardContent>
    </Card>
  );
};
