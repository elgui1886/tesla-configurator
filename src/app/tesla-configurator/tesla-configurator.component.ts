
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { step1Guard } from './guards/step1.guard';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfiguratorStateService } from './services/configurator-state.service';
import { step2Guard } from './guards/step2.guard';

@Component({
  selector: 'app-tesla-configurator',
  standalone: true,
  imports: [RouterModule, AsyncPipe, NgOptimizedImage],
  templateUrl: './tesla-configurator.component.html',
  styleUrl: './tesla-configurator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeslaConfiguratorComponent {
  canNavigateToStep1 = step1Guard();
  canNavigateToStep2 = step2Guard();
  image$ = inject(ConfiguratorStateService).select(model => model.carModel).pipe(
    map(({ carUrl }) => carUrl),
    takeUntilDestroyed()
  );
}
