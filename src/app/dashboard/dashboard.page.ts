import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService, Account } from '../core/services/account.service';
import { AccountCard } from '../shared/ui/account-card/account-card';
import { TranslocoModule } from '@jsverse/transloco';
import { ModalService } from '../core/services/modal.service';
import { SendMoney } from './features/send-money/send-money';

@Component({
  selector: 'afric-dashboard',
  standalone: true,
  imports: [CommonModule, AccountCard, TranslocoModule, SendMoney],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.css'],
})
export class DashboardPage implements OnInit {
  private accountService = inject(AccountService);
  private modalService = inject(ModalService);
  accounts = signal<Account[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  async ngOnInit() {
    try {
      const accountsData = await this.accountService.getAccounts();
      this.accounts.set(accountsData);
      this.loading.set(false);
    } catch (err) {
      this.error.set('Failed to load accounts. Please try again later.');
      console.error('Error loading accounts:', err);
    } finally {
      this.loading.set(false);
    }
  }

  sendMoney() {
    this.modalService.open('send-money-modal');
  }
}
