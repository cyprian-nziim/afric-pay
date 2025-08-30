import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TransactionListItem } from '../../ui/transaction-list-item/transaction-list-item';
import { Transaction } from '../../models/transaction.model';
import { TransactionsService } from '../../../core/services/transactions.service';

@Component({
  selector: 'afric-transactions-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TransactionListItem],
  templateUrl: './list.page.html',
  styleUrl: './list.page.css',
})
export class ListPage implements OnInit {
  private transactionsService = inject(TransactionsService);
  transactions = signal<Transaction[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.isLoading.set(true);
    this.error.set(null);

    this.transactionsService.getTransactions().subscribe({
      next: (transactions) => {
        this.transactions.set(transactions);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Failed to load transactions', error);
        this.error.set(
          error.message ||
            'Failed to load transactions. Please try again later.',
        );
        this.isLoading.set(false);
      },
    });
  }
}
