import { Component, effect, signal } from '@angular/core';
import { EmailPasswordLogin } from '../../features/email-password-login/email-password-login';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { RouterModule } from '@angular/router';
import { AlertCard } from '../../../shared/ui/alert/alert';

@Component({
  selector: 'afric-login',
  imports: [
    CommonModule,
    EmailPasswordLogin,
    TranslocoModule,
    RouterModule,
    AlertCard,
  ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {
  loading = signal<boolean>(false);
}
