import { Injectable } from '@angular/core';

interface Currency {
  rate: number;
  full_name: string;
  name: string;
  symbol: string;
}

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private currencies: Currency[] = [];
  private lastUpdate: string = '';

  async getCurrencies(): Promise<{
    currencies: Currency[];
    lastUpdate: string;
  }> {
    if (this.currencies.length === 0) {
      const currencyRatesData = await this.fetchCurrencyRates();
      for (const key in currencyRatesData.rates) {
        const value = currencyRatesData.rates[key];
        const currency: Currency = {
          rate: value,
          full_name: '',
          name: key,
          symbol: '',
        };
        this.currencies.push(currency);
      }

      const currencyData = await this.fetchCurrencyData();

      currencyData.forEach((currency) => {
        const name = Object.keys(currency.currencies)[0];
        const index = this.currencies.findIndex(
          (element) => element.name === name
        );
        if (index !== -1) {
          this.currencies[index] = {
            ...this.currencies[index],
            full_name: currency.currencies[name].name,
            symbol: currency.currencies[name].symbol,
          };
        }
      });

      this.lastUpdate =
        new Date(currencyRatesData.time_last_update_utc).toLocaleString() +
        ' UTC';

      return { currencies: this.currencies, lastUpdate: this.lastUpdate };
    } else {
      return Promise.resolve({
        currencies: this.currencies,
        lastUpdate: this.lastUpdate,
      });
    }
  }

  private fetchCurrencyRates() {
    return fetch('https://open.er-api.com/v6/latest/UAH')
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error fetching currency rates:', error);
        throw error;
      });
  }

  private fetchCurrencyData() {
    return fetch('https://restcountries.com/v3.1/all?fields=currencies')
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error fetching currency data:', error);
        throw error;
      });
  }
}
