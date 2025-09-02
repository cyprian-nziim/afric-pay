import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from './account.service';
import {
  Transaction,
  TransactionStatus,
} from '../../transactions/models/transaction.model';
import { TransactionsService } from './transactions.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private router = inject(Router);
  private transactionsService = inject(TransactionsService);

  /**
   * Send money to a recipient
   * @param amount Amount to send
   * @param recipientAccountNumber Recipient's account number
   * @param senderAccount Sender's account
   * @param message Optional message
   * @returns Promise that resolves when the transaction is completed
   */
  async sendMoney(
    amount: number,
    recipientAccountNumber: string,
    senderAccount: Account,
    message: string = '',
  ): Promise<Transaction> {
    // Create transaction data
    const transactionData = {
      amount,
      currency: senderAccount.currency,
      description: `Transfer to ${recipientAccountNumber}`,
      senderAccountId: senderAccount.id,
      recipientAccountId: recipientAccountNumber,
      message,
      status: 'pending',
      date: new Date().toISOString(),
    };

    // Add transaction optimistically
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const transaction =
      this.transactionsService.addOptimisticTransaction(transactionData);

    try {
      // Simulate API call
      new Promise((resolve) => setTimeout(resolve, 5000)).then(() => {
        this.transactionsService.updateTransaction(transaction.id, 'posted');
      });

      // Update transaction status to posted on success
      return transaction;
    } catch (error) {
      console.error('Failed to send money:', error);
      // Update transaction status to failed on error
      this.transactionsService.updateTransaction(transaction.id, 'failed');
      throw error;
    }
  }

  // Get all transactions (for the transactions list)
  getTransactions() {
    return this.transactionsService.getTransactions();
  }

  // Get a single transaction by ID
  getTransaction(id: string) {
    return this.transactionsService.getTransaction(id);
  }
}
