import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageAssetService {

  constructor() { }

  getAssetUrl(name: string) {
    return `/assets/images/${name}`;
  }
}
