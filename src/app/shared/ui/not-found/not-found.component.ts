import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'afric-not-found',
  standalone: true,
  imports: [RouterLink, TranslocoModule],
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div class="max-w-md w-full space-y-4">
        <div class="text-9xl font-bold text-primary">404</div>
        <h1 class="text-3xl font-bold">{{ 'not_found.title' | transloco }}</h1>
        <p class="text-gray-600 dark:text-gray-300">
          {{ 'not_found.message' | transloco }}
        </p>
        <a 
          routerLink="/dashboard" 
          class="btn btn-primary mt-4"
        >
          {{ 'not_found.back_home' | transloco }}
        </a>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class NotFoundComponent {}
