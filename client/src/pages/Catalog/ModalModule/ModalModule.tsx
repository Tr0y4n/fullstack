import React, { useEffect, useState } from 'react';
import styles from './ModalModule.module.scss';
import app from '@/api/api';
import { BookSchema, ModalModuleProps } from './ModalModule.types';
import { Alert, AlertTitle, Box, Button, Paper, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addBookSchema } from '@/pages/Auth/schemas';

export const ModalModule: React.FC<ModalModuleProps> = ({ user, setBooksList, setIsModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookSchema>({
    resolver: yupResolver(addBookSchema),
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleEnter = async (form) => {
    try {
      const { author, name, publisher, anotation } = form;
      const body = {
        author,
        name,
        publisher,
        anotation,
        added_by: user?.id,
      };
      const { data } = await app.books.addBook(body);
      setBooksList((prevState) => ({ ...prevState, data }));
      setIsModalOpen(false);
    } catch (e) {
      console.log('Ошибка при добавлении книги, ', e);
      setErrorMessage(e.message);
    }
  };

  return (
    <Paper
      sx={{
        padding: '0 10px',
      }}
    >
      {errorMessage && (
        <Alert severity="error">
          <AlertTitle>Ошибка!</AlertTitle>
          {errorMessage}
        </Alert>
      )}
      <Box component="form" sx={{ mt: 2, width: '600px' }}>
        <TextField
          fullWidth
          label="Автор"
          variant="outlined"
          margin="normal"
          {...register('author')}
          error={!!errors.author}
          helperText={errors.author?.message}
        />
        <TextField
          fullWidth
          label="Название книги"
          variant="outlined"
          margin="normal"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          fullWidth
          label="Издательство, год"
          variant="outlined"
          margin="normal"
          {...register('publisher')}
          error={!!errors.publisher}
          helperText={errors.publisher?.message}
        />
        <TextField
          fullWidth
          label="Аннотация"
          variant="outlined"
          margin="normal"
          {...register('anotation')}
          error={!!errors.anotation}
          helperText={errors.anotation?.message}
        />
        <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit(handleEnter)}>
          Сохранить
        </Button>
      </Box>
      <Box display="flex" justifyContent="space-between" mt={2}></Box>
    </Paper>
  );
};
