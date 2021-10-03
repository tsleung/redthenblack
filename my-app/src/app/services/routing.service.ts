import { Injectable } from '@angular/core';
import * as mapper from '../utils/route_mapper';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor() { }

  mapper = mapper;
}
