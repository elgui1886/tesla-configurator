import { Pipe, PipeTransform, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { DistancePipe } from '@shared/pipes/distance.pipe';
import { CarConfig } from '@tesla-configurator/models/models';
import { SpeedPipe } from '@shared/pipes/speed.pipe';

@Pipe({
  name: 'config',
  standalone: true,
})
export class CarConfigPipe implements PipeTransform {
  _speedPipe = inject(SpeedPipe);
  _distancePipe = inject(DistancePipe);
  _currencyPipe = inject(CurrencyPipe);
  transform(value: CarConfig): unknown {
    const { speed, range, price } = value;
    return `Range: ${this._distancePipe.transform(range)} - Max speed: ${this._speedPipe.transform(speed)} - Cost: ${this._currencyPipe.transform(price)}`;
  }

}
