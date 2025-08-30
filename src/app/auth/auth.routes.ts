import { Routes } from '@angular/router';
import { AuthShell } from './ui/auth-shell/auth-shell';

export const routes: Routes = [
  {
    path: '',
    component: AuthShell,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.page').then((m) => m.LoginPage),
      },
      {
        path: 'passkey',
        loadComponent: () =>
          import('./pages/passkey/passkey.page').then((m) => m.PasskeyPage),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];
