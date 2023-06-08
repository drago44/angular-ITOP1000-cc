import { Component, Input } from '@angular/core';

interface Currency {
  rate: number;
  full_name: string;
  name: string;
  symbol: string;
}

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class AppConverter {
  @Input() currencies: Currency[];
  @Input() lastUpdate;

  inCode: string = 'UAH';
  outCode: string = 'USD';
  inputValue: number;
  outputValue: number;

  toggleCurrencies() {
    [this.inCode, this.outCode] = [this.outCode, this.inCode];
    this.convert('input');
  }

  convert(source: string) {
    const inCurrRate = this.currencies.find(
      (currency) => currency.name === this.inCode
    )?.rate;
    const outCurrRate = this.currencies.find(
      (currency) => currency.name === this.outCode
    )?.rate;

    if (source === 'input' && inCurrRate && outCurrRate) {
      this.outputValue = Number(
        ((this.inputValue * outCurrRate) / inCurrRate).toFixed(2)
      );
    } else if (source === 'output' && inCurrRate && outCurrRate) {
      this.inputValue = Number(
        ((this.outputValue * inCurrRate) / outCurrRate).toFixed(2)
      );
    }
  }
}
