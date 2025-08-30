import { CommonModule } from '@angular/common';
import {
  Component,
  model,
  signal,
  inject,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../core/services/alert.service';
import { LoginCredentials, LoginForm } from '../../../core/models/auth.model';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'afric-email-password-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslocoModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './email-password-login.html',
  styleUrl: './email-password-login.css',
})
export class EmailPasswordLogin implements OnInit {
  loading = model.required<boolean>();
  showPassword = signal<boolean>(false);
  error = signal<string>('');

  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private transloco = inject(TranslocoService);
  private router = inject(Router);

  ngOnInit(): void {
    const hasPasskey = this.authService.currentUser()?.hasPasskey;
    if (hasPasskey) {
      this.router.navigate(['/passkey']);
    }
  }

  loginForm = new FormGroup<LoginForm>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
    }),
  });

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  async clearError() {
    this.error.set('');
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set('');

    const credentials: LoginCredentials = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || '',
    };

    try {
      await this.authService.login(credentials);
    } catch (error: unknown) {
      this.loading.set(false);
      const errorMessage = this.transloco.translate(
        'login.errors.' +
          (error instanceof Error &&
          error.message === 'Invalid email or password'
            ? 'invalid_credentials'
            : 'generic'),
      );
      this.alertService.showError(errorMessage);
    }
  }
}
