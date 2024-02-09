import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs";
import { ConfiguratorStateService } from "../services/configurator-state.service";

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