import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';;
import { CurrencyPipe } from '@angular/common';
import { CarModel, CarOption, CarColor, CarModelConfig } from '@tesla-configurator/models/models';
import { CarConfigPipe } from '@tesla-configurator/pipes/car-option.pipe';
import { ConfiguratorStateService } from '@tesla-configurator/services/configurator-state.service';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CarConfigPipe, CurrencyPipe],
  templateUrl: './step3.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Step3Component {
  private _state = toSignal(
    inject(ConfiguratorStateService).select((model) => model)
  );
  carModel = computed(() => {
    return this._state()?.carModel?.model ?? {} as CarModel;
  });
  carOption = computed(() => {
    return this._state()?.option ?? {} as CarOption;
  });
  carColor = computed(() => {
    return this._state()?.carModel?.color ?? {} as CarColor;
  });
  carConfig = computed(() => {
    const carOption = this.carOption();
    return carOption.config ?? {} as CarModelConfig;
  })
  totalCost = computed(() => {
    const carOption = this.carOption();
    const carColor = this.carColor();
    const carConfig = this.carConfig();
    let result = carConfig.price + carColor.price;
    if (carOption.towHitch) {
      result += 1000;
    }
    if (carOption.yoke) {
      result += 1000;
    }
    return result;
  });
}
