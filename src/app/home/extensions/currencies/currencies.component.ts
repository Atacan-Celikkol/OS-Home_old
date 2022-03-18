import { Component } from '@angular/core';
import { CurrenciesResponse } from '../../../core/models/currency';
import { CurrencyService } from '../../../core/services/currency.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.less']
})
export class CurrenciesComponent {
  exchangeRates: CurrenciesResponse;
  isLoading = true;

  constructor(private currencyService: CurrencyService) {
    this.currencyService.getCurrencies().subscribe(x => {
      Object.keys(x.data).forEach(t => {
        if (t === 'BTC') {
          x.data[t] = x.data[t] / 1000;
        }
        if (t === 'JPY') {
          x.data[t] = x.data[t] / 100;
        }
        x.data[t] = this.getReadableValue(1, x.data[t]);
      });
      this.exchangeRates = x;
      this.isLoading = false;
    });
  }

  getReadableValue(val1: number, val2: number) {
    return (val1 / val2).toFixed(2).toString();
  }
}
