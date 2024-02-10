import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { first, of, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarConfigPipe } from '@tesla-configurator/pipes/car-option.pipe';
import { ConfiguratorApiService } from '@tesla-configurator/services/configurator-api.service';
import { ConfiguratorStateService } from '@tesla-configurator/services/configurator-state.service';
import { CarConfigurationComponent } from '../components/car-configuration/car-configuration.component';
import { CarCheckboxComponent } from '../components/car-checkbox/car-checkbox.component';
@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CarConfigurationComponent, CarConfigPipe, CarCheckboxComponent],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Step2Component {
  configurationStateService = inject(ConfiguratorStateService);
  private _apiService = inject(ConfiguratorApiService);
  private _options = toSignal(
    this.configurationStateService
      .select((model) => model.carModel)
      .pipe(
        switchMap(({ model }) =>
          model ? this._apiService.getCarConfigs(model.code) : of(undefined)
        )
      ),
    {
      initialValue: undefined,
    }
  );
  private _state = toSignal(
    this.configurationStateService
      .select((model) => model.option)
      .pipe(first())
  );

  configurations = computed(() => this._options()?.configs || []);
  hasTowHitchOption = computed(() => !!this._options()?.towHitch);
  hasYokeOption = computed(() => !!this._options()?.yoke);

  selectedConfiguration = computed(() => this._state()?.config);
  selectedTowHitch = computed(() => !!this._state()?.towHitch);
  selectedYoke = computed(() => !!this._state()?.yoke);
}
