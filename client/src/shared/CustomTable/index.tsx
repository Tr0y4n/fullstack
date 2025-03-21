import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { CustomTableProps } from './CustomTable.types';
import { Box } from '@mui/material';
import dayjs from 'dayjs';

export const CustomTable: React.FC<CustomTableProps> = ({ data, columns, maxHeight }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const currentRows = data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDayjsValue = (value: any) => {
    if (dayjs.isDayjs(value)) {
      return value.format('HH:mm DD.MM.YYYY');
    }
    return value;
  };

  return (
    <Box>
      <TableContainer component={Paper} style={{ maxHeight: maxHeight, overflowY: 'auto' }}>
        <Table sx={{ border: '0.5px solid #d9d7d7' }}>
          <TableHead>
            <TableRow>
              {columns.map((item, index) => (
                <TableCell key={index} align="center" sx={{ width: item?.width, fontWeight: 'bold' }}>
                  {item.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} align="center">
                    {formatDayjsValue(row[column.field])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        style={{ minHeight: 42, border: '1px solid #d9d4d4' }}
        component="div"
        count={data?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
        labelRowsPerPage="Строк на странице:"
      />
    </Box>
  );
};
