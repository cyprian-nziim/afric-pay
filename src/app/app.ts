import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SplashLoaderComponent } from './shared/ui/splash-loader/splash-loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SplashLoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'afric-pay';
}
