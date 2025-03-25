import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
// import logo from '@assets/logo.png';
import MenuDropdown from './components/MenuDropdown/MenuDropdown';
import { userMenu } from './consts';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItems } from './Header.types';
import { setCurrentUser } from '@/store/userSlice';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  // const handleLogoClick = () => navigate('/');
  // const currentUser = useSelector((state) => state.user.currentUser);
  // const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));

  const isAdmin = user?.admin;
  const isLoggedIn = !!user;

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  const onLeaveClick = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const userMenu: Array<MenuItems> = [
    { name: 'Профиль', link: '/profile' },
    { name: 'Выйти', onClick: onLeaveClick },
  ];

  return (
    <div className={styles.header}>
      <div style={{ color: 'white' }}>SMEGMA</div>
      <div className={styles.center}>
        <Box onClick={() => navigate('/catalog')} sx={{ color: 'white', cursor: 'pointer' }}>
          КАТАЛОГ
        </Box>
        {isLoggedIn && (
          <Box onClick={() => navigate('/my-books')} sx={{ color: 'white', cursor: 'pointer' }}>
            МОИ КНИГИ
          </Box>
        )}
        {isAdmin && (
          <Box onClick={() => navigate('/admin')} sx={{ color: 'white', cursor: 'pointer' }}>
            АДМИНИСТРИРОВАНИЕ
          </Box>
        )}
      </div>

      {isLoggedIn && <MenuDropdown buttomName={user?.login} data={userMenu} />}
    </div>
  );
};
