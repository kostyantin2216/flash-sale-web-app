import { ProductVariants } from './product-variants.model';
import { OrderableProduct } from './orderable-product.model';

export interface DetailedProduct extends OrderableProduct {
    images: string[];
    price: number;
    retailPrice: number;
    features: string[];
    description: string;
    shippingPrice: number;
}
