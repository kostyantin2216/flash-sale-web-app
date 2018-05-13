import { SummarizedProduct } from './../../../../service/product/summarized-product.model';
import { ProductService } from './../../../../service/product/product.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: SummarizedProduct;
  percentageSaved: number;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.percentageSaved = this.productService.calculateSavingsPercentage(this.product.price, this.product.retailPrice);
  }

}
