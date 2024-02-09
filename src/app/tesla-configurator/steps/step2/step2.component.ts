import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { first, of, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { CarConfig, CarOption } from '@tesla-configurator/models/models';
import { CarConfigPipe } from '@tesla-configurator/pipes/car-option.pipe';
import { ConfiguratorApiService } from '@tesla-configurator/services/configurator-api.service';
import { ConfiguratorStateService } from '@tesla-configurator/services/configurator-state.service';
;

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, CarConfigPipe],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
