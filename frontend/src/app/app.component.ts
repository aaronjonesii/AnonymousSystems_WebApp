import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'anon-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
currentApplicationVersion = environment.appVersion;
}
