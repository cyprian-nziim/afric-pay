import { Component, Input, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'afric-change-language',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslocoModule],
  templateUrl: './change-language.html',
  styleUrl: './change-language.css',
})
export class ChangeLanguage {
  private languageService = inject(LanguageService);

  loading = input<boolean>(false);

  setLanguage(selectedLanguage: string) {
    if (!selectedLanguage) return;
    const language = JSON.parse(selectedLanguage);
    this.languageService.setAppLanguage(language);
  }

  getFilteredLanguages() {
    return this.languageService.getFilteredLanguages();
  }

  get currentLanguage() {
    return this.languageService.appLanguage();
  }
}
