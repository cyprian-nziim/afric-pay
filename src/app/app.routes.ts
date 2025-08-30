import { Routes } from '@angular/router';
import { DashboardShell } from './shared/ui/dashboard-shell/dashboard-shell';
import { NotFoundComponent } from './shared/ui/not-found/not-found.component';

export const routes: Routes = [
  // Auth routes
  {
    path: '',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.routes),
  },

  // Dashboard routes (to be protected)
  {
    path: '',
    component: DashboardShell,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.page').then((m) => m.DashboardPage),
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('./transactions/transactions.routes').then((m) => m.routes),
      },
      // Redirect empty path to dashboard
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // 404 - Not Found
  {
    path: '404',
    component: NotFoundComponent,
  },

  // Catch all other routes and redirect to 404
  {
    path: '**',
    redirectTo: '404',
  },
];
