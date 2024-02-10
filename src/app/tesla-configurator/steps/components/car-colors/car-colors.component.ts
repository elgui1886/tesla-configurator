import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarColor } from '@tesla-configurator/models/models';

@Component({
  selector: 'app-car-colors',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './car-colors.component.html'
})
export class CarColorsComponent {
  compareColorFn(color1: CarColor, color2: CarColor): boolean {
    return color1 && color2 && color1.code === color2.code;
  }

  @Input()
  selectedColor: CarColor | undefined;
  @Input() colors: CarColor[] = [];

  @Output() carColorChange = new EventEmitter<CarColor>();
}
