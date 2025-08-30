import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/list/list.page').then((m) => m.ListPage),
  },
  {
    path: 'show',
    loadComponent: () =>
      import('./pages/show/show.page').then((m) => m.ShowPage),
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];
