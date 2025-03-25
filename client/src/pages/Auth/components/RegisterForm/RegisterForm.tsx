import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link, Alert, AlertTitle, Checkbox, FormControlLabel } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterFormInputs } from '../../index.types';
import { registerSchema } from '../../schemas';
import { useNavigate } from 'react-router-dom';
import { RegisterFormProps } from './RegisterForm.types';
import app from '@/api/api';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '@/store/userSlice';

const RegisterForm: React.FC<RegisterFormProps> = ({ toggleLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerSchema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const handleEnter = async (formData: RegisterFormInputs): Promise<void> => {
    try {
      const body = {
        email: formData.email,
        login: formData.login,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        admin: formData.admin,
      };
      const { data } = await app.users.addUser(body); // Можно засунуть в стор
      dispatch(setCurrentUser(data));
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/admin');
    } catch (e) {
      console.log('Ошибка при регистрации, e = ', e);
      setErrorMessage(e.message);
    }
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
            label="Имя"
            variant="outlined"
            margin="normal"
            {...register('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            sx={{ width: '49%' }}
          />
          <TextField
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
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextField
            label="Логин"
            variant="outlined"
            margin="normal"
            {...register('login')}
            error={!!errors.login}
            helperText={errors.login?.message}
            sx={{ width: '49%' }}
          />
          <TextField
            label="Пароль"
            variant="outlined"
            margin="normal"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ width: '49%' }}
          />
        </Box>
        <Controller
          name="admin"
          control={control}
          render={({ field }) => <FormControlLabel control={<Checkbox {...field} checked={field.value} color="primary" />} label="Администратор" />}
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
