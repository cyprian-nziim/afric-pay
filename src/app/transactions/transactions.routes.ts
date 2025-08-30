import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./pages/list/list.page').then((m) => m.ListPage),
  },
  {
    path: 'show/:id',
    loadComponent: () =>
      import('./pages/show/show.page').then((m) => m.ShowPage),
  },
  {
    path: '**',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];
