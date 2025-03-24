import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import { MenuDropdownProps } from './MenuDropdown.types';
import styles from './MenuDropdown.module.scss';
import cn from 'classnames';

const MenuDropdown: React.FC<MenuDropdownProps> = ({ buttomName, data, className }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className={cn(styles.header, className)}>
      <Button
        size="large"
        className={styles.button}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleButtonClick}
      >
        {buttomName}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {data.map((item) => (
          <MenuItem
            key={item.name}
            onClick={() => {
              setAnchorEl(null);

              if (item.onClick) {
                item.onClick(); // вызываем кастомный onClick
              } else if (item.link) {
                navigate(item.link); // иначе делаем переход
              }
            }}
          >
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default MenuDropdown;
