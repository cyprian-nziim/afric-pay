import { Component, computed, inject, model, signal } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LanguageService } from '../../../core/services/language.service';
import { ThemeService } from '../../../core/services/theme.service';
import { ChangeLanguage } from '../change-language/change-language';
import { ToggleTheme } from '../toggle-theme/toggle-theme';
import { Router } from '@angular/router';

@Component({
  selector: 'afric-dashboard-top-nav',
  imports: [
    CommonModule,
    TranslocoModule,
    FormsModule,
    ChangeLanguage,
    ToggleTheme,
  ],
  templateUrl: './dashboard-top-nav.html',
  styleUrl: './dashboard-top-nav.css',
})
export class DashboardTopNav {
  private router = inject(Router);
  private themeService = inject(ThemeService);
  public languageService = inject(LanguageService);

  currentTheme = computed(() => {
    return this.themeService.currentTheme();
  });

  chosenTheme = computed(() => {
    return this.themeService.chosenTheme();
  });

  loading = signal<boolean>(false);
  loadingTarget = signal<string | null>(null);

  sideNavIsOpen = model<boolean>(true);

  async signOut() {
    this.loading.set(true);
    this.loadingTarget.set('signOut');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.router.navigate(['/']);
  }

  toggleSideNav() {
    this.sideNavIsOpen.set(!this.sideNavIsOpen());
  }

  async resetStates() {
    this.loading.set(false);
  }
}
