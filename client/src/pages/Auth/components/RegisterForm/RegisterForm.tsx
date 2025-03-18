import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link, Alert, AlertTitle } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterFormInputs } from '../../index.types';
import { registerSchema } from '../../schemas';
import { useNavigate } from 'react-router-dom';
import { RegisterFormProps } from './RegisterForm.types';
import app from '@/api/api';

const RegisterForm: React.FC<RegisterFormProps> = ({ toggleLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerSchema),
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleEnter = async (formData: RegisterFormInputs): Promise<void> => {
    try {
      const body = {
        email: formData.email,
        login: formData.login,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
      };
      const res = await app.user.addUser(body); // Можно засунуть в стейт
      console.log('ИНФА С СЕРВЕРА ', res);
    } catch (e) {
      console.log('Ошибка при запросе на кнопку, e = ', e);
      setErrorMessage(e.message);
    }
    navigate('/profile');
  };

  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Регистрация
      </Typography>
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
          Войти
        </Button>
      </Box>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Link component="button" onClick={toggleLogin} sx={{ textTransform: 'none' }}>
          Обратно на авторизацию
        </Link>
      </Box>
    </>
  );
};

export default RegisterForm;
