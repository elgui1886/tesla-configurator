
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfiguratorStateService } from './services/configurator-state.service';
import { step1Guard } from './guards/step1.guard';
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';
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
