import { BooksData } from '../Catalog.types';

export interface ModalModuleProps {
  user: Object;
  setBooksList: React.Dispatch<React.SetStateAction<BooksData[]>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface BookSchema {
  author: string;
  name: string;
  publisher: string;
  anotation: string;
}
