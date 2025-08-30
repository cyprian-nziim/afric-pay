import { Component, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Transaction } from '../../models/transaction.model';
import { TransactionsService } from '../../../core/services/transactions.service';

@Component({
  selector: 'afric-transaction-show',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.css'],
})
export class ShowPage {
  private route = inject(ActivatedRoute);
  private transactionsService = inject(TransactionsService);
  location = inject(Location);

  transaction = signal<Transaction | null>(null);
  isLoading = signal(true);
  error = signal<string | null>(null);
  transactionId = signal<string | null>(null);

  ngOnInit() {
    this.transactionId.set(this.route.snapshot.paramMap.get('id'));
    if (this.transactionId()) {
      this.loadTransaction(this.transactionId()!);
    } else {
      this.error.set('No transaction ID provided');
      this.isLoading.set(false);
    }
  }

  loadTransaction(id: string) {
    this.isLoading.set(true);
    this.error.set(null);

    this.transactionsService.getTransactionById(id).subscribe({
      next: (transaction) => {
        if (transaction) {
          this.transaction.set(transaction);
        } else {
          this.error.set('Transaction not found');
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Failed to load transaction', error);
        this.error.set(error.message || 'Failed to load transaction details');
        this.isLoading.set(false);
      },
    });
  }
}
