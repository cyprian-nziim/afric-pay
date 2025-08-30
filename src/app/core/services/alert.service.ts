import { effect, Injectable, signal } from '@angular/core';
import { Alert, AlertType, AlertState, AlertMode } from '../models/alert';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public alert = signal<Alert | null>(null);
  private currentTimeout: any = null;

  constructor() {
    effect(() => {
      if (this.alert() !== null && this.currentTimeout) {
        clearTimeout(this.currentTimeout);
        this.currentTimeout = null;
      }
    });
  }

  showError(message: string, delay: number = 5000): void {
    this.alert.set(new Alert(
      message,
      AlertType.ERROR,
      AlertState.SHOW,
      'Error',
      delay,
      undefined,
      undefined,
      AlertMode.TOAST
    ));
    this.clearAlertAfterDelay();
  }

  clearMessages(): void {
    if (this.alert()) {
      this.clearAlertAfterDelay();
    }
  }

  private clearAlertAfterDelay(): void {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
    }
    
    const currentAlert = this.alert();
    if (!currentAlert) return;
    
    this.currentTimeout = setTimeout(() => {
      this.alert.set(null);
      this.currentTimeout = null;
    }, currentAlert.delay);
  }
}
