import React from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormInputs } from '../../index.types';
import { loginSchema } from '../../schemas';
import { LoginFormProps } from './LoginForm.types';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, toggleForgotPassword, toggleRegister }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();

  const handleEnter = (): void => {
    navigate('/profile'); // Перенести потом в onSubmit
  };

  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Авторизация
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
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
        <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleEnter}>
          Войти
        </Button>
      </Box>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Link component="button" onClick={toggleRegister} sx={{ textTransform: 'none' }}>
          Ещё нет аккаунта?
        </Link>
        <Link component="button" onClick={toggleForgotPassword} sx={{ textTransform: 'none' }}>
          Забыли пароль?
        </Link>
      </Box>
    </>
  );
};

export default LoginForm;
