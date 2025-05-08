import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component')
  },
  {
    path: 'detail/:id',
    loadComponent: ()  => import('./detail/detail.component')
  },
  {
    path: 'tests',
    loadComponent: () => import('./tests/reactivity.component')
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];
