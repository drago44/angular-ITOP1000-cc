export interface Currency {
  rate: number;
  full_name: string;
  code: string;
  symbol: string;
}

export interface CurrencyRatesData {
  rates: { [key: string]: number };
  time_last_update_utc: string;
}

export interface CurrencyData {
  currencies: { [key: string]: { name: string; symbol: string } };
}
