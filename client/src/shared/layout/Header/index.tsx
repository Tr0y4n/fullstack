import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
// import logo from '@assets/logo.png';
import MenuDropdown from './components/MenuDropdown/MenuDropdown';
import { adminPanel, userMenu, usersAudit } from './consts';
import { Box } from '@mui/material';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => navigate('/');
  return (
    <div className={styles.header}>
      {/* <img className={styles.logo} src={'logo'} onClick={handleLogoClick} /> */}
      <div style={{ color: 'white' }}>SMEGMA</div>
      <div className={styles.center}>
        {/* <MenuDropdown buttomName={'Панель администратора'} data={adminPanel} className={styles.centralMenu} /> */}

        {/* <MenuDropdown buttomName={'Аудит пользователей'} data={usersAudit} className={styles.centralMenu} /> */}
      </div>
      <Box onClick={() => navigate('/admin')} sx={{ color: 'white', cursor: 'pointer', marginRight: '10px' }}>
        АДМИНИСТРИРОВАНИЕ
      </Box>
      <MenuDropdown buttomName={'User'} data={userMenu} />
    </div>
  );
};
