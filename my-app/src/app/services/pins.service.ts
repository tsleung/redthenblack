import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { localCache, memoizeLocalStorage } from '../utils/local_storage';

export interface Pin {
  id?: string;
  years?: number;
  amount?: number;
}

const PINS_CACHE_KEY = "PINS_CACHE_KEY";

@Injectable({
  providedIn: 'root'
})
export class PinsService {


  private pins: Pin[] = memoizeLocalStorage(PINS_CACHE_KEY, () => [
    { id: 'Exotic vacation', years: 1, amount: 20000 },
    { id: 'Fancy car', years: 2, amount: 80000 },
    { id: 'Warm home', years: 5, amount: 200000 },
  ] as Pin[]);

  allPins() {
    return memoizeLocalStorage(PINS_CACHE_KEY, () => this.pins);
  }

  removePin(pin: Pin) {
    this.pins.splice(this.pins.findIndex(suspect => pin.id === suspect.id), 1);
    this.savePins();
  }

  addPin(pin: Pin) {
    this.pins.push({ id: pin.id, years: Number(pin.years), amount: Number(pin.amount) });
    this.savePins();
  }

  private savePins() {
    localCache().setItem(PINS_CACHE_KEY, JSON.stringify(this.pins));
  }
}
