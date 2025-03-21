import React, { useEffect, useState } from 'react';
import styles from './Admin.module.scss';
import { Box, Modal, Typography } from '@mui/material';
import { CustomTable } from '@/shared/CustomTable';
import app from '@/api/api';
import { TableData } from './Admin.types';
import dayjs from 'dayjs';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalModule } from './ModalModule/ModalModule';

export const tableColumns = [
  { field: 'login', headerName: 'Логин' },
  { field: 'password', headerName: 'Пароль' },
  { field: 'email', headerName: 'Email' },
  { field: 'first_name', headerName: 'Имя' },
  { field: 'last_name', headerName: 'Фамилия' },
  { field: 'created_at', headerName: 'Дата регистрации' },
  { field: 'actions', headerName: 'Действия', width: '90px' },
];

export const Admin: React.FC = () => {
  const [tableData, setTableData] = useState<Array<TableData> | []>([]);
  const [editingItem, setEditingItem] = useState<null | object>(null);

  const handleDeleteClick = async (rest: object) => {
    try {
      await app.users.deleteUser(rest.id);
      setTableData((prevState) => prevState.filter((item) => item.id !== rest.id));
    } catch (e) {
      console.log('Ошибка при удалении пользователя, ', e);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await app.users.getAll();
        const formattedData = data.map(({ created_at, ...rest }) => ({
          ...rest,
          created_at: dayjs(created_at),
          actions: (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ModeEditIcon onClick={() => setEditingItem(rest)} sx={{ cursor: 'pointer' }} />
              <DeleteIcon onClick={() => handleDeleteClick(rest)} sx={{ cursor: 'pointer' }} />
            </Box>
          ),
        }));
        setTableData(formattedData);
      } catch (e) {
        console.log('Ошибка при получении списка пользоваетелей, e = ', e);
      }
    };
    getUsers();
  }, []);

  return (
    <div>
      <Typography variant="h5">Список зарегистрированных пользователей</Typography>
      <CustomTable data={tableData} columns={tableColumns} maxHeight="calc(100vh - 60px - 10px - 32px)" />
      <Modal open={!!editingItem} onClose={() => setEditingItem(null)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <ModalModule currentRow={editingItem} setEditingItem={setEditingItem} setTableData={setTableData} />
        </Box>
      </Modal>
    </div>
  );
};
