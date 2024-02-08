import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tesla-configurator',
  },
  {
    path: 'tesla-configurator',
    loadChildren: () =>
      import('./tesla-configurator/tesla-configurator.routes').then(
        (m) => m.routes
      ),
  },
];
