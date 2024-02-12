import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance',
  standalone: true
})
export class DistancePipe implements PipeTransform {
  transform(distance: number, unitOfMeasure = 'miles') {
    return `${distance} ${unitOfMeasure}`;
  }
}
