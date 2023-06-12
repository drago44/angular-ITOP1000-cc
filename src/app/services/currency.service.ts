import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  Currency,
  CurrencyRatesData,
  CurrencyData,
} from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private currencies: Currency[] = [];
  private lastUpdate: string = '';

  constructor(private http: HttpClient) {}

  async getCurrencies(): Promise<{
    currencies: Currency[];
    lastUpdate: string;
  }> {
    if (this.currencies.length === 0) {
      await this.updateCurrencyRates();
      await this.updateCurrencyData();
    }

    return {
      currencies: this.currencies,
      lastUpdate: this.lastUpdate,
    };
  }

  private async updateCurrencyRates(): Promise<void> {
    const currencyRatesData = await this.fetchCurrencyRates();

    if (currencyRatesData?.rates) {
      for (const key of Object.keys(currencyRatesData.rates)) {
        const value = currencyRatesData.rates[key];
        const currency: Currency = {
          rate: value,
          full_name: '',
          code: key,
          symbol: '',
        };
        this.currencies.push(currency);
      }
    }

    this.lastUpdate = currencyRatesData?.time_last_update_utc
      ? new Date(currencyRatesData.time_last_update_utc).toLocaleString() +
        ' UTC'
      : '';
  }

  private async updateCurrencyData(): Promise<void> {
    const currencyData = await this.fetchCurrencyData();

    if (Array.isArray(currencyData)) {
      currencyData.forEach((currency: CurrencyData) => {
        const [name] = Object.keys(currency.currencies);
        if (name) {
          const targetCurrency = this.currencies.find(
            (element) => element.code === name
          );
          if (targetCurrency) {
            targetCurrency.full_name = currency.currencies[name].name;
            targetCurrency.symbol = currency.currencies[name].symbol;
          }
        }
      });
    }
  }

  private async fetchCurrencyRates(): Promise<CurrencyRatesData> {
    try {
      return await firstValueFrom(
        this.http.get<CurrencyRatesData>(
          'https://open.er-api.com/v6/latest/UAH'
        )
      );
    } catch (error) {
      console.error('Error fetching currency rates:', error);
      throw error;
    }
  }

  private async fetchCurrencyData(): Promise<CurrencyData[]> {
    try {
      return await firstValueFrom(
        this.http.get<CurrencyData[]>(
          'https://restcountries.com/v3.1/all?fields=currencies'
        )
      );
    } catch (error) {
      console.error('Error fetching currency data:', error);
      throw error;
    }
  }
}
