import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarConfig } from '@tesla-configurator/models/models';
import { CarConfigPipe } from '@tesla-configurator/pipes/car-option.pipe';

@Component({
  selector: 'app-car-configuration',
  standalone: true,
  imports: [FormsModule, CarConfigPipe],
  templateUrl: './car-configuration.component.html',
  styleUrl: './car-configuration.component.scss'
})
export class CarConfigurationComponent {
  compareConfigurationsFn(config1: CarConfig, config2: CarConfig): boolean {
    return (
      (config1 && config2 && config1.id === config2.id) ||
      (!config1 && !config2)
    );
  }
  @Input()
  selectedConfiguration: CarConfig | undefined;
  @Input() configurations: CarConfig[]  = [];
  @Output() carConfigurationChange = new EventEmitter<CarConfig>();

}
