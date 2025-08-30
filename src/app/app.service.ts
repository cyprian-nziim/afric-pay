import { inject, Injectable, signal } from '@angular/core';
import { ThemeService } from './core/services/theme.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  loading = signal<boolean>(false);
  themeService = inject(ThemeService);
  constructor() {}

  async initThemeService() {
    await this.themeService.init();
  }
}
