import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrompterService {

  constructor() { }

  prompt(message: string, placeholder = ''):Promise<string> {
    return new Promise(resolve => {
      const result = window.prompt(message, placeholder) ?? '';
      resolve(result);
    });
  }
}
