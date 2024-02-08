import { ConfiguratorStateService } from '../services/configurator-state.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const step1Guard = () => {
  return inject(ConfiguratorStateService)
    .getConfigurator$()
    .pipe(
      map((model) => {
        if (!model.model || !model.color) {
          return false;
        }
        return true;
      })
    );
};
