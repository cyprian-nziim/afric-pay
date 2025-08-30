export interface Transaction {
  id: string;
  date: string;
  amount: number;
  currency: string;
  description: string;
  status: 'pending' | 'posted' | 'failed';
}

export interface TransactionListResponse {
  items: Transaction[];
  page: number;
  pageSize: number;
  total: number;
}
