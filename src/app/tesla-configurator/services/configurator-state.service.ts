import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Color, ConfiguratorState, Model } from '../models/models';
@Injectable()
export class ConfiguratorStateService {
  private readonly _baseUrl = 'https://interstate21.com/tesla-app/images';
  private _configurator = new BehaviorSubject<ConfiguratorState>({ model: null, color: null, carUrl: null });

  getConfigurator$() {
    return this._configurator.asObservable();
  }
  getConfigurator() {
    return this._configurator.getValue();
  }

  setCarModelAndColor(state:{ model: Model; color: Color }) {
    const carUrl = this._getCarUrlImage(state.model.code , state.color.code);
    this._configurator.next({ ...state, carUrl });
  }
  resetCarModelAndColor() {
    this._configurator.next({ model: null, color: null, carUrl: null });
  }


  private _getCarUrlImage(carCode: string | null, carColor: string | null) {
    if (!carCode || !carColor) return null;
    return `${this._baseUrl}/${carCode}/${carColor}.jpg`;
  }
}
