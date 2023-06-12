import { Component } from '@angular/core';
import { CurrencyService } from './services/currency.service';
import { Currency } from './shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currencies: Currency[] = [];
  currRateUSD: string;
  currRateEUR: string;
  lastUpdate: string;

  constructor(private currencyService: CurrencyService) {}

  getCurrencyRate(code: string): number | undefined {
    return this.currencies.find((currency) => currency.code === code)?.rate;
  }

  calculateReverseRate(currency: string): string {
    const rate = this.getCurrencyRate(currency);

    if (rate !== undefined) {
      const reverseRate = 1 / rate;
      return reverseRate.toFixed(2);
    }

    return '0.00';
  }

  private dataCurrency() {
    this.currencyService.getCurrencies().then((data) => {
      this.currencies = data.currencies;
      this.lastUpdate = data.lastUpdate;

      this.currRateUSD = this.calculateReverseRate('USD');
      this.currRateEUR = this.calculateReverseRate('EUR');
    });
  }

  ngOnInit() {
    this.dataCurrency();
  }
}
