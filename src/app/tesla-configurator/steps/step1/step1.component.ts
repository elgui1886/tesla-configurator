import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarColor, CarModel } from '@tesla-configurator/models/models';
import { ConfiguratorStateService } from '@tesla-configurator/services/configurator-state.service';
import { ConfiguratorApiService } from '@tesla-configurator/services/configurator-api.service';
import { CarModelsComponent } from '@tesla-configurator/steps/components/car-models/car-models.component';
import { CarColorsComponent } from '@tesla-configurator/steps/components/car-colors/car-colors.component';
@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [CarModelsComponent, CarColorsComponent],
  templateUrl: './step1.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Step1Component {
  private _configurationStateService = inject(ConfiguratorStateService);
  private _apiService = inject(ConfiguratorApiService);

  models = toSignal(this._apiService.getCarModels(), {
    initialValue: [],
  });
  selectedModel = toSignal(this._configurationStateService.select(model => model.carModel.model));

  colors = computed(() => this.selectedModel()?.colors || []);
  selectedColor = toSignal(this._configurationStateService.select(model => model.carModel.color));

  carModelChanged(model: CarModel | undefined) {
    if (model) {
      const color = model.colors[0];
      this._configurationStateService.setCarModelAndColor({model, color});
    } else {
      this._configurationStateService.resetCarModelAndColor();
    }
  }
  carColorChanged(color: CarColor) {
    this._configurationStateService.setCarColor(color);
  }
}
