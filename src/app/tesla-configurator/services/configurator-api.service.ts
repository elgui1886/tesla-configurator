import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Model } from '../models/models';

@Injectable()
export class ConfiguratorApiService {
  private _httpClient = inject(HttpClient);

  getModels() {
    return this._httpClient.get<Model[]>('/models');
  }

}
