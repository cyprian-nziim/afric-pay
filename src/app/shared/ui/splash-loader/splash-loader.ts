import { CommonModule } from '@angular/common';
import { Component, inject, effect, signal } from '@angular/core';
import { AlertCard } from '../alert/alert';
import { AppService } from '../../../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'afric-splash-loader',
  imports: [CommonModule, AlertCard],
  templateUrl: './splash-loader.html',
  styleUrl: './splash-loader.css',
})
export class SplashLoader {
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
