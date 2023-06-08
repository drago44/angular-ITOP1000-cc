import { Component } from '@angular/core';
import { CurrencyService } from './services/currency.service';

interface Currency {
  rate: number;
  full_name: string;
  name: string;
  symbol: string;
}

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

  getCurrRate(currency: string): string {
    const currencyObj = this.currencies.find((curr) => curr.name === currency);

    if (currencyObj) {
      const rate = 1 / currencyObj.rate;
      return rate.toFixed(2);
    }

    return '0.00';
  }

  dataCurrency() {
    this.currencyService.getCurrencies().then((data) => {
      this.currencies = data.currencies;
      this.lastUpdate = data.lastUpdate;

      this.currRateUSD = this.getCurrRate('USD');
      this.currRateEUR = this.getCurrRate('EUR');
    });
  }

  ngOnInit() {
    this.dataCurrency();
  }
}
