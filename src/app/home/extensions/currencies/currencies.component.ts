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
    this.currencyService.getCurrencies(Currencies.TRY, `${Currencies.USD},${Currencies.EUR},${Currencies.GBP}`).subscribe(x => {
      this.exchangeRates = x;
      this.isLoading = false;
    });
  }

  getReadableValue(val: number) {
    const split = (1 / val).toString().split('.');
    return split[0] + '.' + split[1].slice(0, 2);
  }
}
