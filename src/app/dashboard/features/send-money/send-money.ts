import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from '../../../shared/ui/modal/modal';
import { TranslocoModule } from '@jsverse/transloco';
import { ModalService } from '../../../core/services/modal.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  Account,
  AccountService,
} from '../../../core/services/account.service';
import { TransactionService } from '../../../core/services/transaction.service';

@Component({
  selector: 'afric-send-money',
  imports: [CommonModule, TranslocoModule, ModalComponent, FormsModule, HttpClientModule],
  templateUrl: './send-money.html',
  styleUrl: './send-money.css',
})
export class SendMoney {
  private modalService = inject(ModalService);
  private accountService = inject(AccountService);
  private transactionService = inject(TransactionService);
  private router = inject(Router);

  // Form state
  accounts = signal<Account[]>([]);
  selectedAccountId = signal<string>('');
  recipientAccountNumber = signal('');
  amount = signal<number | null>(null);
  message = signal('');
  
  // UI state
  loading = signal(true);
  submitting = signal(false);
  error = signal<string | null>(null);

  constructor() {
    this.loadAccounts();
  }

  private async loadAccounts() {
    this.loading.set(true);
    this.error.set(null);

    try {
      const accounts = await this.accountService.getAccounts();
      this.accounts.set(accounts);
      if (accounts.length > 0) {
        this.selectedAccountId.set(accounts[0].id);
      }
    } catch (error) {
      console.error('Failed to load accounts:', error);
      this.error.set('Failed to load accounts. Please try again later.');
    } finally {
      this.loading.set(false);
    }
  }

  handleCloseModal() {
    this.modalService.close('send-money-modal');
  }

  getSelectedAccount() {
    return (
      this.accounts().find((acc) => acc.id === this.selectedAccountId()) || null
    );
  }

  formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  onAccountChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedAccountId.set(select.value);
  }

  async onSubmit() {
    const amount = this.amount();
    const recipientAccountNumber = this.recipientAccountNumber().trim();
    const selectedAccount = this.getSelectedAccount();

    // Basic validation
    if (!selectedAccount || !amount || amount <= 0 || !recipientAccountNumber) {
      this.error.set('Please fill in all required fields with valid values');
      return;
    }

    if (amount > (selectedAccount?.balance || 0)) {
      this.error.set('Insufficient funds');
      return;
    }

    this.submitting.set(true);
    this.error.set(null);

    try {
      // This will trigger the optimistic update
      await this.transactionService.sendMoney(
        amount,
        recipientAccountNumber,
        selectedAccount,
        this.message()
      );
      
      // Reset form
      this.recipientAccountNumber.set('');
      this.amount.set(null);
      this.message.set('');
      
      // Close the modal and navigate to transactions
      this.handleCloseModal();
      this.router.navigate(['/transactions']);
      
    } catch (error) {
      console.error('Failed to send money:', error);
      // The error is already handled by the service with optimistic updates
      this.error.set('Failed to send money. Please try again.');
    } finally {
      this.submitting.set(false);
    }
  }
}
