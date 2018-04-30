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
            }
        ]);
    }

    calculateSavingsPercentage(price: number, retailPrice: number): number {
        return Math.ceil((100 * price) / retailPrice);
    }

}