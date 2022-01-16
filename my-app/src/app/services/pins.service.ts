import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { localCache, memoizeLocalStorage } from '../utils/local_storage';

export interface Pin {
  id: string;
  years: number;
  amount: number;
  active: boolean;
}

const PINS_CACHE_KEY = "PINS_CACHE_KEY";

@Injectable({
  providedIn: 'root'
})
export class PinsService {


  private pins: Pin[] = memoizeLocalStorage(PINS_CACHE_KEY, () => [
    { id: 'Exotic vacation', years: 1, amount: 20000, active: true },
    { id: 'Fancy car', years: 2, amount: 80000, active: true },
    { id: 'Warm home', years: 5, amount: 200000, active: true },
  ] as Pin[]);

  allPins() {
    return this.pins;
  }

  allPinsByYears() {
    return this.pins.sort((a,b) => a.years - b.years);
  }

  removePin(pin: Pin) {
    this.pins.splice(this.pins.findIndex(suspect => JSON.stringify(pin) === JSON.stringify(suspect)), 1);
    this.savePins();
  }

  addPin(pin: Pin) {
    this.pins.push({ id: pin.id, years: Number(pin.years), amount: Number(pin.amount), active: Boolean(pin.active) });
    this.savePins();
  }

  private savePins() {
    localCache().setItem(PINS_CACHE_KEY, JSON.stringify(this.pins));
  }
}
