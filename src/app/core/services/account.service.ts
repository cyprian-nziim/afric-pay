import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { RequestsService } from './requests.service';

export interface Account {
  id: string;
  name: string;
  balance: number;
  currency: string;
  accountNumber: string;
  type: 'savings' | 'current' | 'investment' | 'credit';
  status: 'active' | 'inactive' | 'suspended';
  lastUpdated: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly ACCOUNTS_URL = '/assets/data/accounts.json';

  constructor(
    private http: HttpClient,
    private requestsService: RequestsService
  ) {}

  async getAccounts(): Promise<Account[]> {
    try {
      return await this.requestsService.handleRequest(() =>
        firstValueFrom(
          this.http.get<Account[]>(this.ACCOUNTS_URL)
        )
      );
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
      return [];
    }
  }

  async getAccountById(id: string): Promise<Account | null> {
    const accounts = await this.getAccounts();
    return accounts.find(account => account.id === id) || null;
  }
}
