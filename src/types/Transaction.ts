import { TransactionType } from "./enums";

export interface Transaction {
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
