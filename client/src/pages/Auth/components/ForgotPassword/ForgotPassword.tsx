import React from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ForgotPasswordFormInputs } from '../../index.types';
import { forgotPasswordSchema } from '../../schemas';
import { ForgotPasswordFormProps } from './ForgotPasswordForm.types';

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSubmit, toggleLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Восстановление пароля
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
        <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Отправить инструкции
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        <Link component="button" onClick={toggleLogin} sx={{ textTransform: 'none' }}>
          Вернуться к авторизации
        </Link>
      </Box>
    </>
  );
};

export default ForgotPasswordForm;
