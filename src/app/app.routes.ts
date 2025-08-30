import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  //   {
  //     path: 'transactions',
  //     loadChildren: () => import('./transactions/transactions.routes').then((m) => m.routes),
  //   },
];
