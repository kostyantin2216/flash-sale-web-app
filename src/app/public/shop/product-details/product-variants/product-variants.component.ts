import { Component, OnInit, Input } from '@angular/core';

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

  @Input() variantsInput: any;

  stock: number;
  variant: Variant;

  constructor() { }

  ngOnInit() {
    console.log(JSON.stringify(this.variantsInput));
    if (this.variantsInput["stock"]) {
      this.stock = this.variantsInput["stock"];

      console.log(this.stock);
    } else {
      this.variant = new Variant(Object.keys(this.variantsInput)[0]);

      this.variantsInput[this.variant.name].forEach(optionInput => {
        let optionName = Object.keys(optionInput)[0];
        this.variant.addOption(new Option(optionName, optionInput[optionName].stock));
      });

      console.log(JSON.stringify(this.variant));
    }
  }

  optionSelected(option: string) {
    for (let i = 0; i < this.variant.options.length; i++) {
      if (this.variant.options[i].name === option) {
        this.stock = this.variant.options[i].stock;
        return;
      }
    }
  }

}
