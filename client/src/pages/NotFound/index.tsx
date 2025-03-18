import React from 'react';
import { NavLink } from 'react-router-dom';
// import NotFoundPNG from '@assets/NotFound.png';
import styles from './NotFound.module.scss';

export const NotFound: React.FC = () => {
  return (
    <div className={styles.layout}>
      <img src={'NotFoundPNG'} alt="ПШНХ" />
      <NavLink to="/" className={styles.link}>
        На главную
      </NavLink>
    </div>
  );
};
