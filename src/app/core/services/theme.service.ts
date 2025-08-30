// import { UserService } from './../../services/user.service';
// import { AnalyticsService } from './analytics.service';
import { inject, Injectable, signal } from '@angular/core';
// import { StatusBar, Style } from '@capacitor/status-bar';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public currentTheme = signal<string>('dark');
  public chosenTheme = signal<string>(localStorage.getItem('theme') || '');

  constructor() {} // private analytics: AnalyticsService,

  async init() {
    await this.initAppStatusBar();
    if (this.chosenTheme()) {
      await this.changeTheme(this.chosenTheme());
      // console.log(`theme`, this.chosenTheme());
      return;
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.autoChangeTheme('dark');
    } else {
      this.autoChangeTheme('light');
    }

    // window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    //   const newColorScheme = event.matches ? "dark" : "light";
    // });

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        const newColorScheme = event.matches ? 'dark' : 'light';

        if (newColorScheme === 'light') {
          this.autoChangeTheme('light');
        } else {
          this.autoChangeTheme('dark');
        }
      });

    // console.log(
    //   `localStorage.getItem('autoTheme')`,
    //   localStorage.getItem('autoTheme'),
    // );
  }

  async initAppStatusBar() {
    // Display content under transparent status bar
    // StatusBar.setOverlaysWebView({ overlay: false });
    // const setStatusBarStyleDark = async () => {
    //   await StatusBar.setStyle({ style: Style.Dark });
    // };
    // const setStatusBarStyleLight = async () => {
    //   await StatusBar.setStyle({ style: Style.Light });
    // };
    // const setStatusBarBGDark = async () => {
    //   await StatusBar.setBackgroundColor({ color: '#000000' });
    // };
    // const setStatusBarBGLight = async () => {
    //   await StatusBar.setBackgroundColor({ color: '#ffffff' });
    // };
  }

  async changeTheme(theme: string) {
    const body = document.getElementById('body');

    if (theme == 'dark') {
      body?.setAttribute('data-theme', 'afric-dark');
      localStorage.setItem('theme', 'dark');
      // this.analytics.setUserTheme(theme);
      // await this.userService.updatePreferences({ theme: 'dark' });
    } else {
      body?.setAttribute('data-theme', 'afric-light');
      localStorage.setItem('theme', 'light');
      // this.analytics.setUserTheme(theme);
      // await this.userService.updatePreferences({ theme: 'light' });
    }

    this.currentTheme.set(theme);
  }

  autoChangeTheme(theme: string) {
    const body = document.getElementById('body');

    if (theme == 'dark') {
      body?.setAttribute('data-theme', 'afric-dark');
      localStorage.setItem('autoTheme', 'dark');
      // this.analytics.setUserTheme(theme);
    } else {
      body?.setAttribute('data-theme', 'afric-light');
      localStorage.setItem('autoTheme', 'light');
      // this.analytics.setUserTheme(theme);
    }

    this.currentTheme.set(theme);
  }

  getCurrentTheme() {
    // return localStorage.getItem('theme');
    return localStorage.getItem('theme') || localStorage.getItem('autoTheme');
  }

  async toggleTheme() {
    const theme = this.getCurrentTheme();
    if (theme == 'dark') {
      await this.changeTheme('light');
    } else {
      await this.changeTheme('dark');
    }
  }
}
