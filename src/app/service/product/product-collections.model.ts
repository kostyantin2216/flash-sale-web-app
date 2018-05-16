import { SummarizedProduct } from './summarized-product.model';
import { ProductCollection } from './product-collection.model';
import { productPriceComparator } from './product-price.comparator';

export class ProductCollections {
    public under300: ProductCollection = {
        title: 'Under 300',
        content: [],
        filter: product => product.price <= 300
    };

    public under500: ProductCollection = {
        title: 'Under 500',
        content: [],
        filter: product => product.price <= 500
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

    isEmpty() {
        const collections = Object.keys(this);
        for (let i = 0; i < collections.length; i++) {
            if (this[collections[i]].content.length > 0) {
                return false;
            }
        }
        return true;
    }
}
