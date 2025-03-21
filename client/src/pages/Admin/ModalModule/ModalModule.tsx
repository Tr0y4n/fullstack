import React, { useEffect, useState } from 'react';
import styles from './ModalModule.module.scss';
import app from '@/api/api';
import { ModalModuleProps } from './ModalModule.types';
import { Alert, AlertTitle, Box, Button, Paper, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { RegisterFormInputs } from '@/pages/Auth/index.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '@/pages/Auth/schemas';
import dayjs from 'dayjs';

export const ModalModule: React.FC<ModalModuleProps> = ({ currentRow, setEditingItem, setTableData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      login: currentRow?.login,
      password: currentRow?.password,
      email: currentRow?.email,
      firstName: currentRow?.first_name,
      lastName: currentRow?.last_name,
    },
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleEnter = async (form) => {
    const { email, login, password } = form;
    const body = {
      id: currentRow?.id,
      email,
      login,
      password,
      first_name: form.firstName,
      last_name: form.lastName,
    };

    const { data: newUser } = await app.users.editUser(body);
    setTableData((prevState) => prevState.map((row) => (row.id === currentRow.id ? { ...row, ...newUser, created_at: dayjs(newUser.created_at) } : row)));
    setEditingItem(null);
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
      <Box component="form" sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextField
            fullWidth
            label="Имя"
            variant="outlined"
            margin="normal"
            {...register('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            sx={{ width: '49%' }}
          />
          <TextField
            fullWidth
            label="Фамилия"
            variant="outlined"
            margin="normal"
            {...register('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            sx={{ width: '49%' }}
          />
        </Box>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          fullWidth
          label="Логин"
          variant="outlined"
          margin="normal"
          {...register('login')}
          error={!!errors.login}
          helperText={errors.login?.message}
        />
        <TextField
          fullWidth
          label="Пароль"
          variant="outlined"
          margin="normal"
          type="password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit(handleEnter)}>
          Сохранить
        </Button>
      </Box>
      <Box display="flex" justifyContent="space-between" mt={2}></Box>
    </Paper>
  );
};
