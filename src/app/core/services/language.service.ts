import { HandleErrorsService } from './handle-errors.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from 'rxjs';
import { Language } from '../models/language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public languages = signal<Language[]>([]);
  public appLanguage = signal<Language | null>(this.getAppLanguage());
  private transloco = inject(TranslocoService);
  private handleErrorsService = inject(HandleErrorsService);

  constructor(private http: HttpClient) {}

  async init() {
    await this.getAllLanguages();
    this.setAutoLanguage();
  }

  setAppLanguage(language: Language, type = 'user') {
    const jsonLanguage = JSON.stringify(language);
    if (jsonLanguage) {
      if (type !== 'user') {
        localStorage.setItem('autoLanguage', jsonLanguage);
      } else {
        localStorage.setItem('language', jsonLanguage);
      }
      this.transloco.setActiveLang(language.code!);
    } else {
      this.init();
    }
  }

  setAutoLanguage() {
    if (this.appLanguage()) {
      return;
    }
    const browserLanguage = navigator.language.split('-')[0];
    const availableLanguages = this.languages().map(
      (language) => language.code,
    );

    if (availableLanguages.includes(browserLanguage)) {
      const language = this.languages().find(
        (lang) => lang.code === browserLanguage,
      )!;
      this.setAppLanguage(language, 'auto');
    } else {
      const defaultLanguage = this.languages().find(
        (lang) => lang.code === 'en',
      )!;
      this.setAppLanguage(defaultLanguage, 'auto');
    }
  }

  getAppLanguage(): Language | null {
    const language =
      localStorage.getItem('language') || localStorage.getItem('autoLanguage');
    return language ? JSON.parse(language) : null;
  }

  async getAllLanguages(): Promise<Language[]> {
    if (this.languages().length) {
      return this.languages();
    }

    try {
      const languages = await firstValueFrom(
        this.http.get<Language[]>('/assets/data/languages.json'),
      );

      if (!languages || !Array.isArray(languages)) {
        throw new Error('Invalid languages data format');
      }

      // Filter for active languages and sort them
      const activeLanguages = languages
        .filter((lang): lang is Language =>
          Boolean(lang && lang.is_active && lang.name),
        )
        .sort((a, b) => (a.name || '').localeCompare(b.name || ''));

      this.languages.set(activeLanguages);
      return activeLanguages;
    } catch (error) {
      this.handleErrorsService.handleErrors(error);
      return [];
    }
  }

  getLanguageByCode(code: string): Language | null {
    const language = this.languages().find(
      (language) => language.code === code,
    );

    if (language) {
      return language;
    }
    return null;
  }

  getFilteredLanguages(): Language[] {
    return this.languages().filter((language) => language.is_active);
  }
}
