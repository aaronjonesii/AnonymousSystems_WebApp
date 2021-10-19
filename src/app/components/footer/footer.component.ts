import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'anon-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  currentApplicationVersion = environment.appVersion;

  constructor() {}
}
