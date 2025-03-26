import React, { useState } from 'react';
import styles from './ModalModule.module.scss';
import app from '@/api/api';
import { BookSchema, ModalModuleProps } from './ModalModule.types';
import { Alert, AlertTitle, Box, Button, Paper, styled, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addBookSchema } from '@/pages/Auth/schemas';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckIcon from '@mui/icons-material/Check';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const ModalModule: React.FC<ModalModuleProps> = ({ setBooksList, setModalData, modalData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookSchema>({
    resolver: yupResolver(addBookSchema),
    defaultValues: {
      author: modalData?.author,
      name: modalData?.name,
      publisher: modalData?.publisher,
      anotation: modalData?.anotation,
    },
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [image, setImage] = useState<null | File>(null);

  const handleEnter = async (form) => {
    try {
      const { author, name, publisher, anotation } = form;

      const formData = new FormData();
      formData.append('id', modalData?.id);
      formData.append('author', author);
      formData.append('name', name);
      formData.append('publisher', publisher);
      formData.append('anotation', anotation);

      if (image) {
        formData.append('cover', image); // 👈 поле должно совпадать с `upload.single('cover')`
      }
      const { data } = await app.books.editBook(formData);
      console.log('data ===== ', data);

      setBooksList((prevState) =>
        prevState.map((item) => (item.id === modalData?.id ? { ...item, author, name, publisher, anotation, cover_url: data.saved.cover_url } : item))
      );
      setModalData(null);
    } catch (e) {
      console.log('Ошибка при редактировании книги, ', e);
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
        <Box display={'flex'} alignItems={'center'}>
          <Button component="label" variant="outlined" tabIndex={-1} startIcon={<CloudUploadIcon />}>
            Изображение
            <VisuallyHiddenInput type="file" onChange={(event) => setImage(event.target.files[0])} />
          </Button>
          {!!image && (
            <Box>
              <CheckIcon color="success" sx={{ marginLeft: 1 }} /> {image.name}
            </Box>
          )}
        </Box>
        <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit(handleEnter)}>
          Сохранить
        </Button>
      </Box>
      <Box display="flex" justifyContent="space-between" mt={2}></Box>
    </Paper>
  );
};
