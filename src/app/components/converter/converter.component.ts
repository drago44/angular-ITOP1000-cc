import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Currency } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class AppConverter {
  @Input() getCurrencyRate;
  @Input() currencies: Currency[];
  @Input() lastUpdate: string;

  form = new FormGroup({
    input: new FormControl(),
    output: new FormControl(),
    inputSelect: new FormControl('UAH'),
    outputSelect: new FormControl('USD'),
  });

  public formGetValue(value: string) {
    return this.form.get(value);
  }

  public calculateValue({
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

  public toggleCurrencies(): void {
    const inputCode = this.formGetValue('inputSelect')?.value || 'USD';
    const outputCode = this.formGetValue('outputSelect')?.value || 'UAH';

    this.formGetValue('inputSelect')?.setValue(outputCode);
    this.formGetValue('outputSelect')?.setValue(inputCode);

    this.convert('input');
  }

  public convert(source: 'input' | 'output'): void {
    const inCurrRate = this.getCurrencyRate(
      this.formGetValue('inputSelect')?.value
    );
    const outCurrRate = this.getCurrencyRate(
      this.formGetValue('outputSelect')?.value
    );

    if (inCurrRate && outCurrRate) {
      const inputValue = this.formGetValue('input')?.value || 0;
      const outputValue = this.formGetValue('output')?.value || 0;

      if (source === 'input') {
        const convertedValue = this.calculateValue({
          value: inputValue,
          sourceRate: outCurrRate,
          targetRate: inCurrRate,
        });

        this.formGetValue('output')?.setValue(convertedValue);
      } else if (source === 'output') {
        const convertedValue = this.calculateValue({
          value: outputValue,
          sourceRate: inCurrRate,
          targetRate: outCurrRate,
        });

        this.formGetValue('input')?.setValue(convertedValue);
      }
    }
  }
}
