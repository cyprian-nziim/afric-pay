import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { User, AuthResponse, LoginCredentials } from '../models/auth.model';
import { RequestsService } from './requests.service';
import { HandleErrorsService } from './handle-errors.service';

const AUTH_STORAGE_KEY = 'africpay_auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private requestsService = inject(RequestsService);
  private handleErrorsService = inject(HandleErrorsService);

  private _currentUser = signal<User | null>(this.getStoredUser());
  currentUser = this._currentUser.asReadonly();
  isLoggedIn = computed(() => !!this._currentUser());

  private getStoredUser(): User | null {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored).user : null;
  }

  private storeAuthData(authData: AuthResponse): void {
    try {
      const dataToStore = {
        token: authData.token,
        user: authData.user,
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(dataToStore));
      this._currentUser.set({ ...authData.user }); // Create a new object to trigger change detection
    } catch (error) {
      console.error('Failed to store auth data:', error);
      throw new Error('Failed to store authentication data');
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Get all users from user.json
      const users = await this.requestsService.handleRequest(() =>
        firstValueFrom(
          this.http.get<
            Array<{
              email: string;
              password: string;
              id: string;
              name: string;
              role: string;
            }>
          >('/assets/data/user.json')
        )
      );

      // Find matching user
      const user = users.find((u: any) => u.email === credentials.email);

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // In a real app, we would verify the password hash here
      if (user.password !== credentials.password) {
        throw new Error('Invalid email or password');
      }

      // Get user credentials
      const credentialsData = await this.requestsService.handleRequest(() =>
        firstValueFrom(
          this.http.get<Record<string, { token: string; hasPasskey?: boolean }>>(
            '/assets/data/user-credentials.json'
          )
        )
      );

      const userCredentials = credentialsData[user.id];

      if (!userCredentials) {
        throw new Error('User credentials not found');
      }

      const authResponse: AuthResponse = {
        token: userCredentials.token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          hasPasskey: userCredentials.hasPasskey || false,
        },
      };

      this.storeAuthData(authResponse);

      // Redirect based on passkey status
      if (!authResponse.user.hasPasskey) {
        await this.router.navigate(['/passkey']);
      } else {
        await this.router.navigate(['/dashboard']);
      }

      return authResponse;
    } catch (error) {
      this.handleErrorsService.handleErrors(error);
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    this._currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }

  updateUserPasskeyStatus(hasPasskey: boolean): void {
    const currentAuth = JSON.parse(
      localStorage.getItem(AUTH_STORAGE_KEY) || '{}',
    );
    if (currentAuth.user) {
      currentAuth.user.hasPasskey = hasPasskey;
      this.storeAuthData(currentAuth);
    }
  }

  /**
   * Returns the currently authenticated user
   * @returns The current user or null if not authenticated
   */
  getCurrentUser(): User | null {
    return this._currentUser();
  }
}
