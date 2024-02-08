import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Configurator = { 
  model: string | undefined;
  color: string | undefined;
};


@Injectable({
  providedIn: 'root'
})
export class ConfiguratorStateService {
  private _configurator = new BehaviorSubject<Configurator>({model: undefined, color: undefined});

  getConfigurator$() { 
    return this._configurator.asObservable();
  }
  getConfigurator() { 
    return this._configurator.getValue();
  }

  setColor(color: string) {
    const currentConfig = this.getConfigurator();
    currentConfig.color = color;
    this._configurator.next(currentConfig);
  }
  setModel(model: string) { 
    const currentConfig = this.getConfigurator();
    currentConfig.model = model;
    this._configurator.next(currentConfig);
  }
}
