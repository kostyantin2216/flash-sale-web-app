import { ProductVariants } from './product-variants.model';
import { SummarizedProduct } from './summarized-product.model';
import { OrderableProduct } from './orderable-product.model';

export interface OrderedProduct extends SummarizedProduct, OrderableProduct { }
