import { Component, inject, model, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'afric-passkeys-auth',
  imports: [CommonModule, FormsModule, TranslocoModule],
  templateUrl: './passkeys-auth.html',
  styleUrl: './passkeys-auth.css',
})
export class PasskeysAuth implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal<string | null>('');
  uiState = signal<'login' | 'createPasskey'>('createPasskey');

  ngOnInit(): void {
    const hasPasskey = this.authService.currentUser()?.hasPasskey;
    const userEmail = this.authService.currentUser()?.email ?? null;
    this.email.set(userEmail);
    if (hasPasskey) {
      this.uiState.set('login');
    } else {
      this.uiState.set('createPasskey');
    }
  }

  submitEmail(): void {
    if (this.email()) {
      this.authService.updateUserPasskeyStatus(true);
      this.router.navigate(['/dashboard']);
    }
  }

  showCreatePasskeyFlow(): void {
    this.uiState.set('createPasskey');
  }

  showLoginFlow(): void {
    this.uiState.set('login');
  }

  actualPasskeyLoginAttempt(): void {
    console.log('Attempting passkey login for:', this.email());
  }

  actualPasskeyCreationAttempt(): void {
    console.log('Attempting passkey creation for:', this.email());
  }
}
