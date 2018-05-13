import { SummarizedProduct } from './summarized-product.model';

export interface ProductCollection {
    title: string;
    content: SummarizedProduct[];
    filter: (product: SummarizedProduct) => boolean;
}
