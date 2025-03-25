import { BooksData } from '@/pages/Catalog/Catalog.types';

export interface ModalModuleProps {
  setBooksList: React.Dispatch<React.SetStateAction<BooksData[]>>;
  setModalData: React.Dispatch<React.SetStateAction<BooksData | null>>;
  modalData: BooksData | null;
}

export interface BookSchema {
  author: string;
  name: string;
  publisher: string;
  anotation: string;
}
