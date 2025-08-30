import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountNumberPipe } from '../../pipes/account-number.pipe';

export interface Account {
  id: string;
  type: 'current' | 'savings' | 'investment' | 'credit';
  currency: string;
  balance: number;
  name?: string;
  accountNumber?: string;
  status?: 'active' | 'inactive' | 'suspended';
  lastUpdated?: string;
}

@Component({
  selector: 'afric-account-card',
  standalone: true,
  imports: [CommonModule, AccountNumberPipe],
  templateUrl: './account-card.html',
  styleUrl: './account-card.css'
})
export class AccountCard {
  @Input() account!: Account;
  @Input() loading = false;
  showBalance = false;

  get accountType(): string {
    const types: { [key: string]: string } = {
      'current': 'Compte Courant',
      'savings': 'Épargne',
      'investment': 'Investissement',
      'credit': 'Crédit'
    };
    return types[this.account.type] || this.account.type;
  }

  get formattedBalance(): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(this.account.balance);
  }

  getAccountIcon(): string {
    const icons: { [key: string]: string } = {
      'current': 'fa-solid fa-wallet text-2xl',
      'savings': 'fa-solid fa-piggy-bank text-2xl',
      'investment': 'fa-solid fa-chart-line text-2xl',
      'credit': 'fa-solid fa-credit-card text-2xl'
    };
    return icons[this.account.type] || 'fa-solid fa-wallet text-2xl';
  }

  toggleBalance() {
    this.showBalance = !this.showBalance;
  }
}
