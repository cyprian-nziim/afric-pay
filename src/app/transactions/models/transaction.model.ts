export type TransactionStatus = 'pending' | 'posted' | 'failed';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  currency: string;
  description: string;
  status: TransactionStatus;
  senderAccountId?: string;
  recipientAccountId?: string;
  message?: string;
  timestamp?: string;
}

export interface TransactionListResponse {
  items: Transaction[];
  page: number;
  pageSize: number;
  total: number;
}
