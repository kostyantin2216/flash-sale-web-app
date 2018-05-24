import { OrderedProduct } from "../product/ordered-product.model";

export interface ShoppingCart {
    token: string;
    expiresOn: number;
    products: OrderedProduct[];
}
