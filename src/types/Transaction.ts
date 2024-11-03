import { TransactionType } from './enums';

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  type: TransactionType;
  date: string;
  categoryId: string;
  category: {
    name: string;
  };
  userId: string;
}
