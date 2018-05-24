import { ProductVariants, buildVariantSelection } from './../../../../service/product/product-variants.model';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CounterInputComponent } from '../../../../shared/counter-input/counter-input.component';

class Variant {
  public options: Option[] = [];

  constructor(
    public name: string
  ) { }

  addOption(option: Option) {
    this.options.push(option);
  }
}

class Option {
  constructor(
    public name: string,
    public stock: number
  ) { }
}

@Component({
  selector: 'app-product-variants',
  templateUrl: './product-variants.component.html',
  styleUrls: ['./product-variants.component.scss']
})
export class ProductVariantsComponent implements OnInit {

  @Input() variantsInput: ProductVariants;

  @ViewChild(CounterInputComponent)
  private counterComponent: CounterInputComponent;

  stock: number;
  variant: Variant;

  private chosenOption: string;

  constructor() { }

  ngOnInit() {
    if ('stock' in this.variantsInput) {
      this.stock = this.variantsInput["stock"];
      this.chosenOption = 'stock';
    } else {
      this.variant = new Variant(Object.keys(this.variantsInput)[0]);

      this.variantsInput[this.variant.name].forEach(optionInput => {
        let optionName = Object.keys(optionInput)[0];
        this.variant.addOption(new Option(optionName, optionInput[optionName].stock));
      });
    }
  }

  optionSelected(option: string) {
    this.chosenOption = option;
    for (let i = 0; i < this.variant.options.length; i++) {
      if (this.variant.options[i].name === option) {
        this.stock = this.variant.options[i].stock;
        return;
      }
    }
  }

  get selectedVariant() {
    if (this.chosenOption && this.counterComponent && this.counterComponent.counterValue > 0) {
      return buildVariantSelection(this.chosenOption, this.counterComponent.counterValue, this.variantsInput);
    }

    return null;
  }

}
