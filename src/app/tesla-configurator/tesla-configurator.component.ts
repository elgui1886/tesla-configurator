
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { step1Guard } from './guards/step1.guard';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-tesla-configurator',
  standalone: true,
  imports: [RouterModule, AsyncPipe],
  templateUrl: './tesla-configurator.component.html',
  styleUrl: './tesla-configurator.component.scss'
})
export class TeslaConfiguratorComponent {
 canNavigate = step1Guard();
}
