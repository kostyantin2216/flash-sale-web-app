import { SetProducts } from './../public/shop/store/shop.actions';
import { SummarizedProduct } from './product.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

export interface SummarizedProduct {
    name: string;
    brand: string;
    shortName: string;
    image: string;
    price: number;
    retailPrice: number;
}

export interface ProductCollection {
    title: string;
    content: SummarizedProduct[];
    filter: (product: SummarizedProduct) => boolean;
}

export class ProductCollections {
    public under100: ProductCollection = {
        title: 'Under 100',
        content: [],
        filter: product => product.price <= 100
    };

    public under400: ProductCollection = {
        title: 'Under 400',
        content: [],
        filter: product => product.price <= 400
    };

    public under1000: ProductCollection = {
        title: 'Under 1000',
        content: [],
        filter: product => product.price <= 1000
    };

    public over1000: ProductCollection = {
        title: 'Over 1000',
        content: [],
        filter: product => product.price > 1000
    };

    constructor(products: SummarizedProduct[] = []) {
        if (products.length > 0) {
            this.addProducts(products);
        }
    }

    addProducts(products: SummarizedProduct[]) {
        products.sort(productPriceComparator);
        const collections = Object.keys(this);
        products.forEach(product => {
            let index = 0;
            while (!this[collections[index]].filter(product)) {
                index++;
            }
            if (index < collections.length) {
                this[collections[index]].content.push(product);
            }
        });
    }
}

export function productPriceComparator(a: SummarizedProduct, b: SummarizedProduct) {
    if (a.price < b.price) {
        return -1;
    }
    if (a.price > b.price) {
        return 1;
    }
    return 0;
}

@Injectable()
export class ProductService {

    fetchAllProducts(): Observable<SummarizedProduct[]> {
        return Observable.of([
            {
                name: 'Q7 Assorted Karaoke Mic With Bluetooth Speaker',
                brand: 'Maxxlite',
                shortName: 'Maxxlite Karaoke Mic',
                image: 'https://odo.imgix.net/media/catalog/product/m/a/maxxlite-q7-assorted-karaoke-mic-with-bluetooth-speaker-large_2d039e02d737579f1175b53a87a26e94.jpg?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 399,
                retailPrice: 1000
            },
            {
                name: 'Set of 2 Car Seat Cup Holders',
                brand: 'Universal',
                shortName: 'Car Seat Cup Holders',
                image: 'https://odo.imgix.net/media/catalog/product/a/u/auto-bekerhouder-opbergen-opruimen-multifunctionele-universele-autostoel-bekerhouder-telefoon-houder-stand-prullenbak-auto-opbergdoos_2.jpg?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 179,
                retailPrice: 360
            },
            {
                name: "Men's Bamboo Watch",
                brand: 'Bewell',
                shortName: 'Bewell Bamboo Watches',
                image: 'https://odo.imgix.net/media/catalog/product/s/c/screen_shot_2018-04-26_at_9.50.36_am.png?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 799,
                retailPrice: 1400
            },
            {
                name: 'Activity Sensor',
                brand: 'Beurer',
                shortName: 'Beurer Activity Sensor',
                image: 'https://odo.imgix.net/media/catalog/product/o/d/odo-ar-8461.png?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 649,
                retailPrice: 980
            },
            {
                name: 'Meerkat Allday Cooler Bag',
                brand: 'Bushtec',
                shortName: 'Bushtec Cooler Bag',
                image: 'https://odo.imgix.net/media/catalog/product/b/u/bushtec-adventure-meerkat-allday-cooler.jpg?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 449,
                retailPrice: 900
            },
            {
                name: 'Meerkat Basecamp Cooler',
                brand: 'Bushtec',
                shortName: 'Bushtec Cooler',
                image: 'https://odo.imgix.net/media/catalog/product/f/i/file_4_9_1.png?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 549,
                retailPrice: 1000
            },
            {
                name: 'Pack of 2 Rechargeable LED Lights',
                brand: 'Major Tech',
                shortName: 'Major Tech Rechargeable Lights',
                image: 'https://odo.imgix.net/media/catalog/product/o/d/odo-ar-8460.png?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 179,
                retailPrice: 480
            },
            {
                name: 'Set of 2 Somerton Wall Mounted Drying Racks',
                brand: 'Hills',
                shortName: 'Hills Wall Mounted Drying Rack',
                image: 'https://odo.imgix.net/media/catalog/product/o/d/odo-ar-4068_1_1_1.jpg?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 249,
                retailPrice: 400
            },
            {
                name: 'Q7 Assorted Karaoke Mic With Bluetooth Speaker',
                brand: 'Maxxlite',
                shortName: 'Maxxlite Karaoke Mic',
                image: 'https://odo.imgix.net/media/catalog/product/m/a/maxxlite-q7-assorted-karaoke-mic-with-bluetooth-speaker-large_2d039e02d737579f1175b53a87a26e94.jpg?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 299,
                retailPrice: 9000
            },
            {
                name: 'Set of 2 Car Seat Cup Holders',
                brand: 'Universal',
                shortName: 'Car Seat Cup Holders',
                image: 'https://odo.imgix.net/media/catalog/product/a/u/auto-bekerhouder-opbergen-opruimen-multifunctionele-universele-autostoel-bekerhouder-telefoon-houder-stand-prullenbak-auto-opbergdoos_2.jpg?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 79,
                retailPrice: 260
            },
            {
                name: "Men's Bamboo Watch",
                brand: 'Bewell',
                shortName: 'Bewell Bamboo Watches',
                image: 'https://odo.imgix.net/media/catalog/product/s/c/screen_shot_2018-04-26_at_9.50.36_am.png?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 699,
                retailPrice: 1200
            },
            {
                name: 'Activity Sensor',
                brand: 'Beurer',
                shortName: 'Beurer Activity Sensor',
                image: 'https://odo.imgix.net/media/catalog/product/o/d/odo-ar-8461.png?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 549,
                retailPrice: 880
            },
            {
                name: 'Meerkat Allday Cooler Bag',
                brand: 'Bushtec',
                shortName: 'Bushtec Cooler Bag',
                image: 'https://odo.imgix.net/media/catalog/product/b/u/bushtec-adventure-meerkat-allday-cooler.jpg?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 349,
                retailPrice: 800
            },
            {
                name: 'Meerkat Basecamp Cooler',
                brand: 'Bushtec',
                shortName: 'Bushtec Cooler',
                image: 'https://odo.imgix.net/media/catalog/product/f/i/file_4_9_1.png?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 449,
                retailPrice: 9000
            },
            {
                name: 'Pack of 2 Rechargeable LED Lights',
                brand: 'Major Tech',
                shortName: 'Major Tech Rechargeable Lights',
                image: 'https://odo.imgix.net/media/catalog/product/o/d/odo-ar-8460.png?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 79,
                retailPrice: 380
            },
            {
                name: 'Set of 2 Somerton Wall Mounted Drying Racks',
                brand: 'Hills',
                shortName: 'Hills Wall Mounted Drying Rack',
                image: 'https://odo.imgix.net/media/catalog/product/o/d/odo-ar-4068_1_1_1.jpg?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 149,
                retailPrice: 300
            },
            {
                name: 'Q7 Assorted Karaoke Mic With Bluetooth Speaker',
                brand: 'Maxxlite',
                shortName: 'Maxxlite Karaoke Mic',
                image: 'https://odo.imgix.net/media/catalog/product/m/a/maxxlite-q7-assorted-karaoke-mic-with-bluetooth-speaker-large_2d039e02d737579f1175b53a87a26e94.jpg?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 1399,
                retailPrice: 2000
            },
            {
                name: 'Set of 2 Car Seat Cup Holders',
                brand: 'Universal',
                shortName: 'Car Seat Cup Holders',
                image: 'https://odo.imgix.net/media/catalog/product/a/u/auto-bekerhouder-opbergen-opruimen-multifunctionele-universele-autostoel-bekerhouder-telefoon-houder-stand-prullenbak-auto-opbergdoos_2.jpg?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 79,
                retailPrice: 260
            },
            {
                name: "Men's Bamboo Watch",
                brand: 'Bewell',
                shortName: 'Bewell Bamboo Watches',
                image: 'https://odo.imgix.net/media/catalog/product/s/c/screen_shot_2018-04-26_at_9.50.36_am.png?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 1799,
                retailPrice: 2400
            },
            {
                name: 'Activity Sensor',
                brand: 'Beurer',
                shortName: 'Beurer Activity Sensor',
                image: 'https://odo.imgix.net/media/catalog/product/o/d/odo-ar-8461.png?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 1649,
                retailPrice: 1980
            },
            {
                name: 'Meerkat Allday Cooler Bag',
                brand: 'Bushtec',
                shortName: 'Bushtec Cooler Bag',
                image: 'https://odo.imgix.net/media/catalog/product/b/u/bushtec-adventure-meerkat-allday-cooler.jpg?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 49,
                retailPrice: 500
            },
            {
                name: 'Meerkat Basecamp Cooler',
                brand: 'Bushtec',
                shortName: 'Bushtec Cooler',
                image: 'https://odo.imgix.net/media/catalog/product/f/i/file_4_9_1.png?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 49,
                retailPrice: 300
            },
            {
                name: 'Pack of 2 Rechargeable LED Lights',
                brand: 'Major Tech',
                shortName: 'Major Tech Rechargeable Lights',
                image: 'https://odo.imgix.net/media/catalog/product/o/d/odo-ar-8460.png?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 79,
                retailPrice: 280
            },
            {
                name: 'Set of 2 Somerton Wall Mounted Drying Racks',
                brand: 'Hills',
                shortName: 'Hills Wall Mounted Drying Rack',
                image: 'https://odo.imgix.net/media/catalog/product/o/d/odo-ar-4068_1_1_1.jpg?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 1249,
                retailPrice: 2400
            },
            {
                name: 'Q7 Assorted Karaoke Mic With Bluetooth Speaker',
                brand: 'Maxxlite',
                shortName: 'Maxxlite Karaoke Mic',
                image: 'https://odo.imgix.net/media/catalog/product/m/a/maxxlite-q7-assorted-karaoke-mic-with-bluetooth-speaker-large_2d039e02d737579f1175b53a87a26e94.jpg?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 99,
                retailPrice: 400
            },
            {
                name: 'Set of 2 Car Seat Cup Holders',
                brand: 'Universal',
                shortName: 'Car Seat Cup Holders',
                image: 'https://odo.imgix.net/media/catalog/product/a/u/auto-bekerhouder-opbergen-opruimen-multifunctionele-universele-autostoel-bekerhouder-telefoon-houder-stand-prullenbak-auto-opbergdoos_2.jpg?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 29,
                retailPrice: 160
            },
            {
                name: "Men's Bamboo Watch",
                brand: 'Bewell',
                shortName: 'Bewell Bamboo Watches',
                image: 'https://odo.imgix.net/media/catalog/product/s/c/screen_shot_2018-04-26_at_9.50.36_am.png?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 399,
                retailPrice: 700
            },
            {
                name: 'Activity Sensor',
                brand: 'Beurer',
                shortName: 'Beurer Activity Sensor',
                image: 'https://odo.imgix.net/media/catalog/product/o/d/odo-ar-8461.png?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 49,
                retailPrice: 180
            },
            {
                name: 'Meerkat Allday Cooler Bag',
                brand: 'Bushtec',
                shortName: 'Bushtec Cooler Bag',
                image: 'https://odo.imgix.net/media/catalog/product/b/u/bushtec-adventure-meerkat-allday-cooler.jpg?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 1349,
                retailPrice: 2800
            },
            {
                name: 'Meerkat Basecamp Cooler',
                brand: 'Bushtec',
                shortName: 'Bushtec Cooler',
                image: 'https://odo.imgix.net/media/catalog/product/f/i/file_4_9_1.png?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 1449,
                retailPrice: 3000
            },
            {
                name: 'Pack of 2 Rechargeable LED Lights',
                brand: 'Major Tech',
                shortName: 'Major Tech Rechargeable Lights',
                image: 'https://odo.imgix.net/media/catalog/product/o/d/odo-ar-8460.png?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 99,
                retailPrice: 380
            },
            {
                name: 'Set of 2 Somerton Wall Mounted Drying Racks',
                brand: 'Hills',
                shortName: 'Hills Wall Mounted Drying Rack',
                image: 'https://odo.imgix.net/media/catalog/product/o/d/odo-ar-4068_1_1_1.jpg?fm=jpg&fit=fill&bg=fff&w=500&h=500&auto=compress,format',
                price: 149,
                retailPrice: 300
            }
        ]);
    }

    calculateSavingsPercentage(price: number, retailPrice: number): number {
        return Math.ceil((100 * price) / retailPrice);
    }

}
