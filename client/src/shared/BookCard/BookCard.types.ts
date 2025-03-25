import { BooksData } from '@/pages/Catalog/Catalog.types';

export interface BookCardProps {
  data: BooksData;
  isLoggedIn: boolean;
  isSaved: boolean;
  setModalData?: React.Dispatch<React.SetStateAction<BooksData | null>>;
  setBooksList?: React.Dispatch<React.SetStateAction<BooksData[]>>;
}
