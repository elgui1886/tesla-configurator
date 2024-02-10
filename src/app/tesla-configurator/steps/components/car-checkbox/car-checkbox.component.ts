import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-checkbox',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './car-checkbox.component.html',
  styleUrl: './car-checkbox.component.scss'
})
export class CarCheckboxComponent {

  @Input()
  label: string = '';

  @Input({
    required: true
  })
  id: string = '';

  @Input()
  selected: boolean = false;

  @Output()
  checkboxChange = new EventEmitter<boolean>();
  

}
