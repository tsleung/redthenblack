import { Injectable } from '@angular/core';
import * as mapper from '../utils/route_mapper';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(
    readonly location: Location,
    readonly router: Router,
    readonly titleService: Title,
  ) { }

  back() {
    this.location.back();
  }

  navigate(href: string) {
    this.router.navigate([href]);
  }

  setTitle(title: string) {
    if (title) {
      this.titleService.setTitle(title);
    }
    
  }
  
  mapper = mapper;
}
