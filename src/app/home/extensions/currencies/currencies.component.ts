import { Component } from '@angular/core';
import { Currencies, CurrenciesResponse } from '../../../core/models/currency';
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
    this.currencyService.getCurrencies(Currencies.TRY, `${Currencies.TRY},${Currencies.USD},${Currencies.EUR},${Currencies.GBP},${Currencies.BTC}`).subscribe(x => {
      Object.keys(x.rates).forEach(t => {
        if (t !== 'TRY') {
          x.rates[t] = this.getReadableValue(x.rates.TRY, x.rates[t]);
        }
      });
      this.exchangeRates = x;
      this.isLoading = false;
    });
  }

  getReadableValue(val1: number, val2: number) {
    const split = (val1 / val2).toString().split('.');
    return split[0] + '.' + split[1].slice(0, 2);
  }
}
