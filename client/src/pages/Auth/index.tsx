import React, { useState } from 'react';
import { Grid2, Paper, Box } from '@mui/material';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';

export const Auth: React.FC = () => {
  const [pageType, setPageType] = useState('login');

  return (
    <Grid2 container justifyContent="center" alignItems="center" sx={{ height: '100%', backgroundColor: '#f4f6f8' }}>
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <div style={{ textDecoration: 'underline' }}>
            <b>SMEGMA</b>
          </div>
        </Box>
        {pageType === 'login' ? (
          <LoginForm toggleForgotPassword={() => setPageType('forgot')} toggleRegister={() => setPageType('register')} />
        ) : (
          <RegisterForm toggleLogin={() => setPageType('login')} />
        )}
      </Paper>
    </Grid2>
  );
};
