import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ConfiguratorApiService } from '../../services/configurator-api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe, JsonPipe, NgOptimizedImage } from '@angular/common';
import { ConfiguratorStateService } from '../../services/configurator-state.service';
import { first } from 'rxjs';
import { CarColor, CarModelInfo, CarModel } from '../../models/models';
@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, AsyncPipe, NgOptimizedImage],
  templateUrl: './step1.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Step1Component {
  private _formBuilder = inject(FormBuilder);
  private _configurationStateService = inject(ConfiguratorStateService);
  private _apiService = inject(ConfiguratorApiService);

  compareModelFn(model1: CarModel, model2: CarModel): boolean {
    return model1 && model2 && model1.code === model2.code || (!model1 && !model2);
  }
  compareColorFn(color1: CarColor, color2: CarModel): boolean {
    return color1 && color2 && color1.code === color2.code;
  }

  models$ = this._apiService.getCarModels();

  form = this._formBuilder.group<Omit<CarModelInfo, 'carUrl'>>({
    model: null,
    color: null,
  });

  constructor() {
    this.form.controls.model.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((model) => {
        if (model) {
          const color = model.colors[0];
          this.form.setValue(
            { model, color },
            {
              emitEvent: false,
            }
          );
          this._configurationStateService.setCarModelAndColor({ model, color });
        } else {
          this._configurationStateService.resetCarModelAndColor();
        }
      });
    this.form.controls.color.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((color) => {
        if (color) this._configurationStateService.setCarColor(color);
      });

    this._configurationStateService
      .select(model => model.carModel)
      .pipe(first())
      .subscribe(({model,color}) => {
        this.form.setValue({
          model,
          color,
        }, { emitEvent: false });
      });
  }
}
