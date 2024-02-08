import { Router, Routes } from '@angular/router';
import { TeslaConfiguratorComponent } from './tesla-configurator.component';
import { TESLA_CONFIGURATOR_PROVIDERS } from './services';
import { inject } from '@angular/core';
import { ConfiguratorStateService } from './services/configurator-state.service';
import { step1Guard } from './guards/step1.guard';
import { map } from 'rxjs';

export const routes: Routes = [
  {
    path: '',
    component: TeslaConfiguratorComponent,
    providers: [...TESLA_CONFIGURATOR_PROVIDERS],
    children: [
      {
        path: 'step1',
        loadComponent: () =>
          import('./steps/step1/step1.component').then((m) => m.Step1Component),
      },
      {
        path: 'step2',
        loadComponent: () =>
          import('./steps/step2/step2.component').then((m) => m.Step2Component),
        canActivate: [step1Guard],
      },
      {
        path: 'step3',
        loadComponent: () =>
          import('./steps/step3/step3.component').then((m) => m.Step3Component),
      },
    ],
  },
];
