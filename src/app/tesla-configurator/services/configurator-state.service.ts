import { Injectable } from '@angular/core';
import {
  CarColor,
  CarModelConfig,
  CarConfiguratorState,
  CarModelInfo
} from '@tesla-configurator/models/models';
import { BehaviorSubject, map } from 'rxjs';
@Injectable()
export class ConfiguratorStateService {
  private readonly _initlialState = {
    carModel: { model: undefined, color: undefined, carUrl: undefined },
    option: {
      config: undefined,
      towHitch: false,
      yoke: false,
    },
  };
  private _carConfiguratorState = new BehaviorSubject<CarConfiguratorState>(
    this._initlialState
  );

  select<K>(selector: (state: CarConfiguratorState) => K) {
    return this._carConfiguratorState.asObservable().pipe(map(selector));
  }

  setCarModelAndColor({ model, color }: Omit<CarModelInfo, 'carUrl'>) {
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
  resetCarModelAndColor() {
    this._carConfiguratorState.next(this._initlialState);
  }
  setCarModelConfig(option: CarModelConfig) {
    const currentState = this._carConfiguratorState.getValue();
    this._carConfiguratorState.next({
      ...currentState,
      option: {
        ...currentState.option,
        config: option,
      },
    });
  }
  setCarOptionYoke(yoke: boolean) {
    const currentState = this._carConfiguratorState.getValue();
    this._carConfiguratorState.next({
      ...currentState,
      option: {
        ...currentState.option,
        yoke,
      },
    });
  }
  setCarOptionTowHitch(towHitch: boolean) {
    const currentState = this._carConfiguratorState.getValue();
    this._carConfiguratorState.next({
      ...currentState,
      option: {
        ...currentState.option,
        towHitch,
      },
    });
  }

  private _getCarUrlImage(carCode: string, carColor: string) {
    return `${carCode}/${carColor}.jpg`;
  }
}
