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
  @Input() getCurrencyRate;
  @Input() currencies: Currency[];
  @Input() lastUpdate: string;

  inCode: string = 'UAH';
  outCode: string = 'USD';
  inputValue: number;
  outputValue: number;

  toggleCurrencies(): void {
    [this.inCode, this.outCode] = [this.outCode, this.inCode];
    this.convert('input');
  }

  calculateValue({
    value,
    sourceRate,
    targetRate,
  }: {
    value: number;
    sourceRate: number;
    targetRate: number;
  }): number {
    return Number(((value * sourceRate) / targetRate).toFixed(2));
  }
  

  convert(source: 'input' | 'output'): void {
    const inCurrRate = this.getCurrencyRate(this.inCode);
    const outCurrRate = this.getCurrencyRate(this.outCode);

    if (inCurrRate && outCurrRate) {
      if (source === 'input') {
        this.outputValue = this.calculateValue({
          value: this.inputValue,
          sourceRate: outCurrRate,
          targetRate: inCurrRate,
        });
      } else if (source === 'output') {
        this.inputValue = this.calculateValue({
          value: this.outputValue,
          sourceRate: inCurrRate,
          targetRate: outCurrRate,
        });
      }
    }
  }
}
