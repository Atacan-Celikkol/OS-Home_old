import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(key: string): any {
    return localStorage.getItem(key);
  }
  setItem(key: string, value: string): any {
    localStorage.setItem(key, value);
    return localStorage.getItem(key);
  }
}
