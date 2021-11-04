import { Injectable } from '@angular/core';
import * as mapper from '../utils/route_mapper';
import { Location } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(
    readonly location: Location
  ) { }

  back() {
    this.location.back();
  }
  
  mapper = mapper;
}
