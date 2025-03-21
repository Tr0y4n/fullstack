export interface ModalModuleProps {
  currentRow: Object | null;
  setEditingItem: (arg: Object | null) => void;
  setTableData: React.Dispatch<React.SetStateAction<TableData[] | []>>;
}
