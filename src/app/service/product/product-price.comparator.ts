import { SummarizedProduct } from './summarized-product.model';

export function productPriceComparator(a: SummarizedProduct, b: SummarizedProduct) {
    if (a.price < b.price) {
        return -1;
    }
    if (a.price > b.price) {
        return 1;
    }
    return 0;
}
