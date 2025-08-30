import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SplashLoader } from './shared/ui/splash-loader/splash-loader';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SplashLoader],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'afric-pay';
  public appService = inject(AppService);

  loading = signal<boolean>(false);

  constructor() {
    this.loading.set(this.appService.loading());
    effect(() => {
      if (this.appService.loading()) {
        this.loading.set(true);
      } else {
        this.loading.set(false);
      }
    });
  }

  async ngAfterViewInit(): Promise<void> {
    await this.appService.init();
  }
}
