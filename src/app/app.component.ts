import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AsyncPipe, JsonPipe} from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: '<router-outlet/>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
