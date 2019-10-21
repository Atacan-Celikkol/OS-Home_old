import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CurrenciesResponse } from '../models/currency';

const Endpoints = {
   BaseUrl: 'http://data.fixer.io/api/',
   GetLatest: (symbols) =>
      `${Endpoints.BaseUrl}latest?access_key=${environment.fixerIo_api_key}&symbols=${symbols}`,
};

@Injectable({
   providedIn: 'root'
})
export class CurrencyService {
   constructor(private httpClient: HttpClient) {
   }

   getCurrencies(base, currencies): Observable<CurrenciesResponse> {
      const url = Endpoints.GetLatest(currencies);

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
