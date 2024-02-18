import { Injectable } from '@angular/core';
import * as mapper from '../utils/route_mapper';
import { Location } from '@angular/common'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(
    readonly location: Location,
    readonly router: Router,
  ) { }

  back() {
    this.location.back();
  }

  navigate(href: string) {
    this.router.navigate([href]);
  }
  
  mapper = mapper;
}
