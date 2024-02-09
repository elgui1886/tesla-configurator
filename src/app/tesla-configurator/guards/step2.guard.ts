import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { ConfiguratorStateService } from "@tesla-configurator/services/configurator-state.service";
import { map } from "rxjs";

export const step2Guard = () => {
    return inject(ConfiguratorStateService)
      .select(state => state.option)
      .pipe(
        map((carOption) => {
          if (!carOption.config) {
            return false;
          }
          return true;
        })
      );
  };
  export const step2RouteGuard = () => {
    const router = inject(Router);
    return step2Guard().pipe(
      map((canNavigate) => {
        if (!canNavigate) {
          return router.createUrlTree(['/tesla-configurator/step2']);
        }
        return canNavigate;
      })
    );
  };