import { inject, Injectable, signal } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { LanguageService } from './core/services/language.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  loading = signal<boolean>(false);
  themeService = inject(ThemeService);
  languageService = inject(LanguageService);

  async init() {
    // Theme Initialization
    this.themeService.init();

    // Initialize Languages
    await this.languageService.init();
  }
}
