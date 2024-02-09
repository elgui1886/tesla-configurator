import { Routes } from '@angular/router';
import { TeslaConfiguratorComponent } from './tesla-configurator.component';
import { TESLA_CONFIGURATOR_PROVIDERS } from './services';
import { step1RouteGuard } from './guards/step1.guard';
import { step2RouteGuard } from './guards/step2.guard';

export const routes: Routes = [
  {
    path: '',
    component: TeslaConfiguratorComponent,
    providers: [...TESLA_CONFIGURATOR_PROVIDERS],
    children: [
      {
        path: '',
        redirectTo: 'step1',
        pathMatch: 'full',
      },
      {
        path: 'step1',
        loadComponent: () =>
          import('./steps/step1/step1.component').then((m) => m.Step1Component),
      },
      {
        path: 'step2',
        loadComponent: () =>
          import('./steps/step2/step2.component').then((m) => m.Step2Component),
        canActivate: [step1RouteGuard],
      },
      {
        path: 'step3',
        loadComponent: () =>
          import('./steps/step3/step3.component').then((m) => m.Step3Component),
          canActivate: [step2RouteGuard],
      },
    ],
  },
];
