import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { OrderedProduct } from '../product/ordered-product.model';
import { ShoppingCart } from './shopping-cart.model';
import { OrderableProduct } from '../product/orderable-product.model';

@Injectable()
export class ShoppingCartService {

    readonly host = `${ environment.apihost }/cart`;

    constructor(
        private http: HttpClient
    ) { }

    fetchProducts(token: string): Observable<ShoppingCart> {
        return this.http.get<ShoppingCart>(this.builUrl(token));
    }

    addProduct(product: OrderableProduct, token?: string): Observable<ShoppingCart> {
        return this.http.post<ShoppingCart>(this.builUrl('add'), {
            token: token,
            product: product
        });
    }

    removeProduct(product: OrderableProduct, token: string): Observable<ShoppingCart> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: {
                token: token,
                product: product
            }
        };
        return this.http.delete<ShoppingCart>(this.builUrl('remove'), httpOptions);
    }

    private builUrl(suffix: string): string {
        return `${ this.host }/${ suffix }`;
    }

}
