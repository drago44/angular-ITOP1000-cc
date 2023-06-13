import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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

  public getCurrencies(): Observable<{
    currencies: Currency[];
    lastUpdate: string;
  }> {
    if (this.currencies.length === 0) {
      return this.updateCurrencyRates().pipe(
        map(() => this.updateCurrencyData()),
        map(() => ({
          currencies: this.currencies,
          lastUpdate: this.lastUpdate,
        })),
        catchError((error) => {
          console.error('Error fetching currencies:', error);
          throw error;
        })
      );
    }

    return of({
      currencies: this.currencies,
      lastUpdate: this.lastUpdate,
    });
  }

  private updateCurrencyRates(): Observable<void> {
    return this.fetchCurrencyRates().pipe(
      map((currencyRatesData) => {
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
      })
    );
  }

  private updateCurrencyData(): void {
    this.fetchCurrencyData().subscribe((currencyData) => {
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
    });
  }

  private fetchCurrencyRates(): Observable<CurrencyRatesData> {
    return this.http.get<CurrencyRatesData>(
      'https://open.er-api.com/v6/latest/UAH'
    );
  }

  private fetchCurrencyData(): Observable<CurrencyData[]> {
    return this.http.get<CurrencyData[]>(
      'https://restcountries.com/v3.1/all?fields=currencies'
    );
  }
}
