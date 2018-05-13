import { environment } from './../../../environments/environment';
import { DetailedProduct } from './detailed-product.model';
import { SummarizedProduct } from './summarized-product.model';
import { ProductCollection } from './product-collection.model';
import { SetProducts } from './../../public/shop/store/shop.actions';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { productPriceComparator } from './product-price.comparator';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {

    readonly host = `${ environment.apihost }/products`;

    constructor(
        private http: HttpClient
    ) { }

    fetchAllProducts(): Observable<SummarizedProduct[]> {
        return this.http.get<SummarizedProduct[]>(this.builUrl(''));
            
    }

    fetchProductDetails(brand: string, name: string): Observable<DetailedProduct> {
        return this.http.get<DetailedProduct>(this.builUrl(`${ brand }/${ name }`))
    }

    calculateSavingsPercentage(price: number, retailPrice: number): number {
        return Math.ceil((100 * price) / retailPrice);
    }

    private builUrl(suffix) {
        return `${ this.host }/${ suffix }`;
    }

}
