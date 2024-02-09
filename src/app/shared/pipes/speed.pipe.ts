import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'speed',
  standalone: true
})
export class SpeedPipe implements PipeTransform {

  transform(speed: number, unitOfMeasure = 'mph') {
    return `${speed} ${unitOfMeasure}`;
  }

}
