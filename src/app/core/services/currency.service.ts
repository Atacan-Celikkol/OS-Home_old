import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CurrenciesResponse } from '../models/currency';

const Endpoints = {
   BaseUrl: 'https://api.currencyapi.com/v2',
   GetLatest: () =>
      `${Endpoints.BaseUrl}/latest?apikey=${environment.freeCurrency_api_key}&base_currency=TRY`,
};

@Injectable({
   providedIn: 'root'
})
export class CurrencyService {
   constructor(private httpClient: HttpClient) {
   }

   getCurrencies(): Observable<CurrenciesResponse> {
      const url = Endpoints.GetLatest();

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
