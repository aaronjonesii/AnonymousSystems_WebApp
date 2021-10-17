import { Component, OnInit } from '@angular/core';
import { UrlService } from '../services/url.service';

@Component({
  selector: 'anon-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.scss']
})
export class GoBackComponent {

  constructor(
    private urlService: UrlService,
  ) { }

  goBack() {
    this.urlService.goBack();
  }

}
