import { ChangeDetectionStrategy, Component, HostBinding, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ConfiguratorApiService } from '../../services/configurator-api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe, JsonPipe, NgOptimizedImage } from '@angular/common';
import { ConfiguratorStateService } from '../../services/configurator-state.service';
import { map, of } from 'rxjs';
import { ConfiguratorState } from '../../models/models';
import { isEoNoU } from '../../../utils/utils';
@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, AsyncPipe, NgOptimizedImage],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Step1Component {

  private _formBuilder = inject(FormBuilder);
  private _configurationStateService = inject(ConfiguratorStateService);
  private _apiService = inject(ConfiguratorApiService);

  models$ = this._apiService.getCarModels();
  form = this._formBuilder.group<Omit<ConfiguratorState, 'carUrl'>>({
    model: null,
    color: null
  });
  image$ = this._configurationStateService.getConfigurator$().pipe(
    map(({ carUrl }) => {
      return carUrl;
    }),
    takeUntilDestroyed())

  constructor() {
    this.form.controls.model.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => {
      const model = isEoNoU(value) ? null : value;
      if (model) {
        const color = model.colors[0];
        this.form.setValue({ model, color }, {
          emitEvent: false
        });
        this._configurationStateService.setCarModelAndColor({ model, color });
      } else {
        this._configurationStateService.resetCarModelAndColor();
      }

    })
    this.form.controls.color.valueChanges.pipe(takeUntilDestroyed()).subscribe(color => {
      const model = this.form.controls.model.value;
      if (model && color)
        this._configurationStateService.setCarModelAndColor({ model, color });
    })
  }
}
