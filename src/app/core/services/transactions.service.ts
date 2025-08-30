import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, firstValueFrom, of, tap } from 'rxjs';
import { Transaction, TransactionListResponse, TransactionStatus } from '../../transactions/models/transaction.model';
import { RequestsService } from './requests.service';
import { Account } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private http = inject(HttpClient);
  private requestsService = inject(RequestsService);
  private transactionsUrl = 'assets/data/transactions.json';
  
  // Signal to hold the transactions state
  private transactionsSignal = signal<Transaction[]>([]);
  private isLoadingSignal = signal(true);
  readonly isLoading = this.isLoadingSignal.asReadonly();

  /**
   * Fetches all transactions
   * @returns Observable of Transaction array
   */
  getTransactions(): Observable<Transaction[]> {
    this.isLoadingSignal.set(true);
    
    const requestFn = async () => {
      const response = await firstValueFrom(
        this.http.get<TransactionListResponse>(this.transactionsUrl)
      );
      return response.items || [];
    };

    return new Observable<Transaction[]>(subscriber => {
      this.requestsService.handleRequest(requestFn)
        .then(transactions => {
          this.transactionsSignal.set(transactions);
          this.isLoadingSignal.set(false);
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
   * Add a new transaction optimistically
   * @param transaction Transaction data without id, status, and timestamp
   * @returns The created transaction with generated ID and status
   */
  addOptimisticTransaction(transactionData: Omit<Transaction, 'id' | 'status' | 'timestamp'>): Transaction {
    const newTransaction: Transaction = {
      ...transactionData,
      id: `tx_${Date.now()}`,
      status: 'pending',
      timestamp: new Date().toISOString()
    };

    this.transactionsSignal.update(transactions => [newTransaction, ...transactions]);
    return newTransaction;
  }

  /**
   * Update transaction status
   * @param transactionId ID of the transaction to update
   * @param status New status
   * @param updates Optional additional fields to update
   */
  updateTransaction(transactionId: string, status: TransactionStatus, updates: Partial<Transaction> = {}) {
    this.transactionsSignal.update(transactions => 
      transactions.map(tx => 
        tx.id === transactionId ? { ...tx, status, ...updates } : tx
      )
    );
  }

  /**
   * Get a single transaction by ID
   * @param id Transaction ID
   * @returns Transaction or undefined if not found
   */
  getTransaction(id: string): Transaction | undefined {
    return this.transactionsSignal().find(tx => tx.id === id);
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
