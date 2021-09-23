import { Injectable } from '@angular/core';

interface Timebox {

}

interface Pin {}

interface Features {
  yearsToRetirement: Timebox;
  pins: Pin[];
}

interface Simulations {
  
}

interface Suit {
  features: Features;
  simulations: Simulations[];
}

/** The suit which financial strategy is catered to */
@Injectable({
  providedIn: 'root'
})
export class SuitabilityService {

  constructor() {

    console.log('hello suitability')
   }
}
