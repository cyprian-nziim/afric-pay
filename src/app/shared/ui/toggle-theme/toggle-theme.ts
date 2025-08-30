import { Component, Input, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'afric-toggle-theme',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './toggle-theme.html',
  styleUrl: './toggle-theme.css',
})
export class ToggleTheme {
  private themeService = inject(ThemeService);

  loading = input<boolean>(false);
  loadingTarget = input<string | null>(null);

  currentTheme = this.themeService.currentTheme;

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
