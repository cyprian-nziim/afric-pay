import { CommonModule } from '@angular/common';
import { Component, inject, effect, signal } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { AppService } from '../../../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'afric-splash-loader',
  imports: [CommonModule, AlertComponent],
  templateUrl: './splash-loader.component.html',
  styleUrl: './splash-loader.component.scss',
})
export class SplashLoaderComponent {
  private router = inject(Router);
  appService = inject(AppService);
  loading = signal<boolean>(true);

  loadingTimeout = setTimeout(() => {
    if (this.loading()) {
      this.router.navigateByUrl('/dashboard');
      this.loading.set(false);
    }
  }, 5000);

  loadingEffect = effect(() => {
    if (this.appService.loading()) {
      this.loading.set(true);
    } else {
      setTimeout(() => {
        const state = this.router.url.includes('auth');
        if (state) {
          this.router.navigateByUrl('/dashboard');
        }
        this.loading.set(false);
        clearTimeout(this.loadingTimeout);
      }, 500);
    }
  });

  constructor() {}
}
