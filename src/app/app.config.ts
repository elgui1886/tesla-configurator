import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { SHARED_PIPES } from '@shared/pipes';
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withViewTransitions()), importProvidersFrom(HttpClientModule), ...SHARED_PIPES, CurrencyPipe]
};
