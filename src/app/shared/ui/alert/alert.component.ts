import { Component, effect, inject, model, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../core/services/alert.service';
import { Alert, AlertMode } from '../../../core/models/alert';

@Component({
  selector: 'afric-alert',
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent implements OnDestroy {
  private alertService = inject(AlertService);
  // [x: string]: any;
  alert = model<Alert | null>(null);
  // alertEffect = effect(() => { console.log('memory leak')
  //   console.log('Alert Changed', this.alert());
  // });
  margin = model<Boolean>(false);

  constructor() {
    effect(() => {
      if (
        !!this.alert() &&
        !(
          this.alert()?.mode === AlertMode.DISMISSIBLE ||
          this.alert()?.mode === AlertMode.FIXED
        )
      ) {
        this.hideAlertAfterDelay();
      }

      if (!!!this.alert() && !!this.alertService.alert()) {
        this.handOver();
      }
    });
  }

  handOver() {
    this.alert.set(this.alertService.alert());
    this.alertService.clearMessages();
  }

  private hideAlertAfterDelay(): void {
    setTimeout(() => {
      this.alert.set(null);
    }, this.alert()?.delay || 5000);
  }

  closeAlert() {
    this.alert.set(null);
    this.alertService.alert.set(null);
  }

  ngOnDestroy(): void {
    this.alert.set(null);
  }
}
