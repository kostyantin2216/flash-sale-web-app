import { ProductVariants } from "./product-variants.model";

export interface OrderableProduct {
    name: string;
    brand: string;
    variants: ProductVariants;
}
