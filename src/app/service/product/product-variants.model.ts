export interface Stock {
    stock: number;
}

export interface Variant {
    [prop: string]: Stock;
}

export type ProductVariants = Stock | { [prop: string]: Variant[] };
