import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CarModel, CarOptions } from '@tesla-configurator/models/models';

@Injectable()
export class ConfiguratorApiService {
  private _httpClient = inject(HttpClient);;

  getCarModels() {
    return this._httpClient.get<CarModel[]>('/models');
  }

  getCarConfigs(carCode: string) {
    return this._httpClient.get<CarOptions>(`/options/${carCode}`);
  }

}
