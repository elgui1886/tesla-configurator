import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ConfiguratorStateService } from '../../services/configurator-state.service';
import { ConfiguratorApiService } from '../../services/configurator-api.service';
import { first, map, of, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { CarConfig, CarOption, CarOptions } from '../../models/models';
import { CarConfigPipe } from '../../pipes/car-option.pipe';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, JsonPipe, CarConfigPipe],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss',
})
export class Step2Component {
  private _formBuilder = inject(FormBuilder);
  private _configurationStateService = inject(ConfiguratorStateService);
  private _apiService = inject(ConfiguratorApiService);

  compareConfigurationsFn(config1: CarConfig, config2: CarConfig): boolean {
    return (
      (config1 && config2 && config1.id === config2.id) ||
      (!config1 && !config2)
    );
  }

  option$ = this._configurationStateService
    .select((model) => model.carModel)
    .pipe(
      switchMap(({ model }) =>
        model ? this._apiService.getCarConfigs(model.code) : of(null)
      )
    );

  form = this._formBuilder.group<CarOption>({
    config: null,
    towHitch: false,
    yoke: false,
  });

  constructor() {
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((formValue) => {
      const option = {
        config: formValue.config ?? null,
        towHitch: formValue.towHitch ?? false,
        yoke: formValue.yoke ?? false,
      };
      this._configurationStateService.setCarOption(option);
    });

    this._configurationStateService
      .select((model) => model.option)
      .pipe(first())
      .subscribe((state) => {
        this.form.setValue(state, { emitEvent: false });
      });
  }
}
