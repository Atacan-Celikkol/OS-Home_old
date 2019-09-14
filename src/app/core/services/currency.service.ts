import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CurrenciesResponse } from '../models/currency';

const Endpoints = {
   GetLatest: 'https://api.exchangeratesapi.io/latest?',
};

const Filters = {
   BaseCurrency: (base) => 'base=' + base,
   BySymbols: (symbols: string) => 'symbols=' + symbols // USD,TRY
}

@Injectable({
   providedIn: 'root'
})
export class CurrencyService {
   constructor(private httpClient: HttpClient) {
   }

   getCurrencies(base: string = '', symbols: string = ''): Observable<CurrenciesResponse> {
      const url = Endpoints.GetLatest +
         Filters.BaseCurrency(base) + '&' +
         Filters.BySymbols(symbols);

      return this.httpClient.get<CurrenciesResponse>(url).pipe(
         retry(1),
         catchError(this.handleError)
      );
   }

   //#region Should be moved to a base service
   handleError(err) {
      let errorMessage = '';
      if (err.error instanceof ErrorEvent) {
         // Get client-side error
         errorMessage = err.error.message;
      } else {
         // Get server-side error
         errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
      }
      return throwError(errorMessage);
   }
   //#endregion
}
