import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TransactionListItem } from '../../ui/transaction-list-item/transaction-list-item';
import { Transaction, TransactionStatus } from '../../models/transaction.model';
import { TransactionsService } from '../../../core/services/transactions.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'afric-transactions-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TransactionListItem],
  templateUrl: './list.page.html',
  styleUrl: './list.page.css',
})
export class TransactionsListPage {
  // Inject services
  private transactionsService = inject(TransactionsService);

  // State
  transactions = computed(() => this.transactionsService.transactions());
  isLoading = signal(true);
  error = signal<string | null>(null);

  // Computed values
  sortedTransactions = computed(() => {
    return [...this.transactions()].sort(
      (a, b) =>
        new Date(b.timestamp || b.date).getTime() -
        new Date(a.timestamp || a.date).getTime(),
    );
  });

  groupedTransactions = computed(() => {
    const groups: { [key: string]: Transaction[] } = {};

    this.sortedTransactions().forEach((transaction) => {
      const date = new Date(transaction.timestamp || transaction.date);
      const dateStr = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }

      groups[dateStr].push(transaction);
    });

    return Object.entries(groups).map(([date, transactions]) => ({
      date,
      transactions,
    }));
  });

  constructor() {
    // Load transactions when component initializes
    this.loadTransactions();
  }

  // Load transactions from the service
  loadTransactions(isRefresh = false) {
    this.isLoading.set(true);
    if (!isRefresh && this.transactionsService.transactions().length > 0) {
      this.isLoading.set(false);
      return;
    }
    this.error.set(null);

    this.transactionsService
      .getTransactions()
      .pipe(
        catchError((error) => {
          console.error('Error loading transactions:', error);
          this.error.set('Failed to load transactions. Please try again.');
          return of([]);
        }),
      )
      .subscribe(() => {
        this.isLoading.set(false);
      });
  }

  // Retry loading transactions
  retry() {
    this.loadTransactions();
  }
}
