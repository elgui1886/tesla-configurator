import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarModel } from '@tesla-configurator/models/models';

@Component({
  selector: 'app-car-model',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './car-models.component.html'
})
export class CarModelsComponent {


  compareModelFn(model1: CarModel, model2: CarModel): boolean {
    return model1 && model2 && model1.code === model2.code || (!model1 && !model2);
  }
  @Input()
  selectedModel: CarModel | undefined;
  @Input() models: CarModel[] = [];


  @Output() carModelChange = new EventEmitter<CarModel>();

}
