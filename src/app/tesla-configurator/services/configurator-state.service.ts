import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import {
  CarColor,
  Step1State as Step1Info,
  CarConfiguratorState,
  CarOption,
} from '../models/models';
@Injectable()
export class ConfiguratorStateService {
  private readonly _initlialState = {
    carModel: { model: null, color: null, carUrl: null },
    option: {
      config: null,
      towHitch: false,
      yoke: false,
    },
  };
  private readonly _baseImageUrl = 'https://interstate21.com/tesla-app/images';
  private _carConfiguratorState = new BehaviorSubject<CarConfiguratorState>(
    this._initlialState
  );


  select<K>(selector: (state: CarConfiguratorState) => K) {
    return this._carConfiguratorState.asObservable().pipe(map(selector));
  }

  setCarModelAndColor({ model, color }: Step1Info) {
    if (model && color) {
      const carUrl = this._getCarUrlImage(model.code, color.code);
      this._carConfiguratorState.next({
        ...this._initlialState,
        carModel: {
          model,
          color,
          carUrl,
        },
      });
    }
  }
  setCarColor(color: CarColor) {
    const currentState = this._carConfiguratorState.getValue();
    const model = currentState.carModel.model;
    if (model && color) {
      const carUrl = this._getCarUrlImage(model.code, color.code);
      this._carConfiguratorState.next({
        ...currentState,
        carModel: { ...currentState.carModel, color, carUrl },
      });
    }
  }
  setCarOption(option: CarOption) {
    const currentState = this._carConfiguratorState.getValue();
    this._carConfiguratorState.next({
      ...currentState,
      option,
    });
  }
  resetCarModelAndColor() {
    this._carConfiguratorState.next(this._initlialState);
  }

  private _getCarUrlImage(carCode: string, carColor: string) {
    return `${this._baseImageUrl}/${carCode}/${carColor}.jpg`;
  }
}
