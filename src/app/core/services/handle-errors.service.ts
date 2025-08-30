import { inject, Injectable, signal } from '@angular/core';
import { AlertService } from './alert.service';
import { environment } from '../../../environments/environment';
import { Alert, AlertMode, AlertType } from '../models/alert';

@Injectable({
  providedIn: 'root',
})
export class HandleErrorsService {
  private alertService = inject(AlertService);
  private alertType = signal<AlertType>(AlertType.ERROR);
  private alertMode = signal<AlertMode>(AlertMode.SIMPLE);
  private alertDelay = signal<number>(5000);

  constructor() {}

  async handleErrors(error: any) {
    const message = await this.checkError(error);
    const alert = new Alert();
    alert.message = message;
    alert.type = this.alertType();
    alert.mode = this.alertMode();
    alert.delay = this.alertDelay();

    this.alertService.alert.set(alert);
  }

  async checkError(error: any) {
    const { code, message } = error;

    switch (code) {
      case 'FORBIDDEN':
        if (environment.production) {
          this.alertType.set(AlertType.WARNING_OUTLINED);
          this.alertMode.set(AlertMode.DISMISSIBLE);
          return 'ACCESS FORBIDDEN: Please contact your administrator.';
        }
        this.alertType.set(AlertType.WARNING_OUTLINED);
        this.alertMode.set(AlertMode.DISMISSIBLE);
        return 'ACCESS FORBIDDEN: Please contact your administrator.';
      case 'TOKEN_EXPIRED':
        if (environment.production) {
          this.alertType.set(AlertType.WARNING_OUTLINED);
          return 'Your session has expired. Please log in again.';
        }
        return 'Your session has expired.';
      case 'APP_NOT_FOUND':
        return 'App does not exist!';
      case 'BOSS_AUTH_INVALID_TOKEN':
        this.alertType.set(AlertType.WARNING_OUTLINED);
        return 'Sorry, your session has expired.';
      case 'UNAUTHORIZED':
        this.alertType.set(AlertType.ERROR_OUTLINED);
        return 'You are not authorized to perform this action.';
      case 'RECAPTCHA_FAILED':
        location.reload();
        return 'Something went wrong.';
      case 'FAILED_TO_SEND_MESSAGE':
        return 'An error occurred while sending the message. Please retry.';
      case 'INVALID_CREDENTIALS':
        return 'Invalid credentials. Please check your email and or password.';
      case 'INVALID_USER':
        return 'Invalid user.';
      case 'RECORD_NOT_UNIQUE':
        return 'Record not unique.';
      case 'INTERNAL_SERVER_ERROR':
        this.alertType.set(AlertType.ERROR_OUTLINED);
        return message;
      case 'UNEXPECTED_ERROR':
        this.alertType.set(AlertType.ERROR_OUTLINED);
        return message;
      case undefined:
        return message;
      default:
        return 'Something went wrong';
    }
  }
}
