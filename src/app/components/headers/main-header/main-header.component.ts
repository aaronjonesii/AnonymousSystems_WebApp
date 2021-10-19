import { Component, OnInit } from '@angular/core';
import { nav_path } from '../../../app-routing.module';

@Component({
  selector: 'anon-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  nav_path = nav_path;

  constructor() { }

  ngOnInit(): void {
  }

}
