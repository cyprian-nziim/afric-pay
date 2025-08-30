import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, firstValueFrom, of } from 'rxjs';
import { Transaction, TransactionListResponse } from '../../transactions/models/transaction.model';
import { RequestsService } from './requests.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private http = inject(HttpClient);
  private requestsService = inject(RequestsService);
  private transactionsUrl = 'assets/data/transactions.json';

  /**
   * Fetches all transactions
   * @returns Observable of Transaction array
   */
  getTransactions(): Observable<Transaction[]> {
    const requestFn = async () => {
      const response = await firstValueFrom(
        this.http.get<TransactionListResponse>(this.transactionsUrl)
      );
      return response.items || [];
    };

    return new Observable<Transaction[]>(subscriber => {
      this.requestsService.handleRequest(requestFn)
        .then(transactions => {
          subscriber.next(transactions);
          subscriber.complete();
        })
        .catch(error => {
          console.error('Error fetching transactions:', error);
          subscriber.error(new Error('Failed to load transactions. Please try again later.'));
        });
    });
  }

  /**
   * Fetches a single transaction by ID
   * @param id Transaction ID
   * @returns Observable of Transaction or undefined if not found
   */
  getTransactionById(id: string): Observable<Transaction | undefined> {
    const requestFn = async () => {
      const response = await firstValueFrom(
        this.http.get<TransactionListResponse>(this.transactionsUrl)
      );
      return response.items.find(tx => tx.id === id);
    };

    return new Observable<Transaction | undefined>(subscriber => {
      this.requestsService.handleRequest(requestFn)
        .then(transaction => {
          subscriber.next(transaction);
          subscriber.complete();
        })
        .catch(error => {
          console.error(`Error fetching transaction with id ${id}:`, error);
          subscriber.error(new Error('Failed to load transaction details. Please try again later.'));
        });
    });
  }
}
