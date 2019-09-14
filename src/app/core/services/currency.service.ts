import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class CurrencyService {
   constructor(private httpClient: HttpClient) {
   }

   getCurrencies() {
      this.httpClient.get('https://api.exchangeratesapi.io/latest?base=TRY').subscribe(x => console.log(x));
   }
}
