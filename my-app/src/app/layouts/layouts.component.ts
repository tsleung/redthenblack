import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {

  constructor(
    readonly routingService: RoutingService,
  ) { }

  ngOnInit(): void {
  }

}
