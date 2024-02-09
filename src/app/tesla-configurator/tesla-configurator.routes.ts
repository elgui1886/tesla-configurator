import { Routes } from '@angular/router';
import { step1RouteGuard } from './guards/step1.guard';
import { step2RouteGuard } from './guards/step2.guard';
import { TESLA_CONFIGURATOR_PROVIDERS } from './services';
import { TeslaConfiguratorComponent } from './tesla-configurator.component';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
export const routes: Routes = [
  {
    path: '',
    component: TeslaConfiguratorComponent,
    providers: [...TESLA_CONFIGURATOR_PROVIDERS,
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return `https://interstate21.com/tesla-app/images/${config.src}`;
      }
    },],
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
