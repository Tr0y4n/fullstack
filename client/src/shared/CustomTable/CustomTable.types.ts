type TableRowData = Record<string, any>;

interface Column {
  headerName: string;
  width?: string;
  field: string;
}

export interface CustomTableProps {
  data: Array<TableRowData>;
  columns: Array<Column>;
  maxHeight: string;
}
