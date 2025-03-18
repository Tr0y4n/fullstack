import React, { useState } from 'react';
import { Grid2, Paper, Box } from '@mui/material';
import { SubmitHandler } from 'react-hook-form';
// import logo from '@assets/logoRed.png';
import { ForgotPasswordFormInputs, LoginFormInputs } from './index.types';
import LoginForm from './components/LoginForm/LoginForm';
import ForgotPasswordForm from './components/ForgotPassword/ForgotPassword';
import RegisterForm from './components/RegisterForm/RegisterForm';

export const Auth: React.FC = () => {
  const [pageType, setPageType] = useState('login');

  const handleLoginSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log('Авторизация', data);
  };

  const handleForgotSubmit: SubmitHandler<ForgotPasswordFormInputs> = (data) => {
    console.log('Восстановление пароля', data);
  };

  return (
    <Grid2 container justifyContent="center" alignItems="center" sx={{ height: '100%', backgroundColor: '#f4f6f8' }}>
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <div style={{ textDecoration: 'underline' }}>
            <b>SMEGMA</b>
          </div>
        </Box>
        {pageType === 'login' ? (
          <LoginForm onSubmit={handleLoginSubmit} toggleForgotPassword={() => setPageType('forgot')} toggleRegister={() => setPageType('register')} />
        ) : pageType === 'forgot' ? (
          <ForgotPasswordForm onSubmit={handleForgotSubmit} toggleLogin={() => setPageType('login')} />
        ) : (
          <RegisterForm toggleLogin={() => setPageType('login')} />
        )}
      </Paper>
    </Grid2>
  );
};
