import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link, Alert, AlertTitle } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormInputs } from '../../index.types';
import { loginSchema } from '../../schemas';
import { LoginFormProps } from './LoginForm.types';
import { useNavigate } from 'react-router-dom';
import app from '@/api/api';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '@/store/userSlice';

const LoginForm: React.FC<LoginFormProps> = ({ toggleForgotPassword, toggleRegister }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const handleEnter = async (form) => {
    try {
      const { data } = await app.users.logIn(form);
      dispatch(setCurrentUser(data));
      navigate('/admin');
      localStorage.setItem('user', JSON.stringify(data));
    } catch (e) {
      console.log('Ошибка при авторизации, e = ', e);
      setErrorMessage(e.message);
    }
  };

  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Авторизация
      </Typography>
      {errorMessage && (
        <Alert severity="error">
          <AlertTitle>Ошибка!</AlertTitle>
          {errorMessage}
        </Alert>
      )}
      <Box component="form" sx={{ mt: 2 }}>
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
        <Link component="button" onClick={toggleRegister} sx={{ textTransform: 'none' }}>
          Ещё нет аккаунта?
        </Link>
      </Box>
    </>
  );
};

export default LoginForm;
