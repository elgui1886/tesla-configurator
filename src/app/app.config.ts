import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { SHARED_API } from '@shared/pipes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withViewTransitions()), importProvidersFrom(HttpClientModule), ...SHARED_API, CurrencyPipe]
};
