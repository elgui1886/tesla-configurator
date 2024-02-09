import { ConfiguratorStateService } from '../services/configurator-state.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

export const step1Guard = () => {
  return inject(ConfiguratorStateService)
    .select(state => state.carModel)
    .pipe(
      map((carModel) => {
        if (!carModel.model || !carModel.color) {
          return false;
        }
        return true;
      })
    );
};
export const step1RouteGuard = () => {
  const router = inject(Router);
  return step1Guard().pipe(
    map((canNavigate) => {
      if (!canNavigate) {
        return router.createUrlTree(['/']);
      }
      return canNavigate;
    })
  );
};

