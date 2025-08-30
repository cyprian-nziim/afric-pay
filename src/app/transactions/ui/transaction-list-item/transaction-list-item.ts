import { Component, input, Input } from '@angular/core';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'afric-transaction-list-item',
  standalone: true,
  imports: [CommonModule, DatePipe, NgClass, RouterLink],
  templateUrl: './transaction-list-item.html',
  styleUrls: ['./transaction-list-item.css'],
})
export class TransactionListItem {
  showActions = input(true);
  transaction = input<Transaction>();

  get statusColor() {
    return {
      'text-success': this.transaction()?.status === 'posted',
      'text-warning': this.transaction()?.status === 'pending',
      'text-error': this.transaction()?.status === 'failed',
    };
  }

  get amountColor() {
    return {
      'text-success': this.transaction()?.amount! > 0,
      'text-error': this.transaction()?.amount! < 0,
    };
  }
}
