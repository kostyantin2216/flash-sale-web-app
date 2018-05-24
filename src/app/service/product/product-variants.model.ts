import { ProductVariants } from './product-variants.model';
export interface Stock {
    stock: number;
}

export interface Variant {
    [prop: string]: Stock;
}

export type ProductVariants = Stock | { [prop: string]: Variant[] };

export function getTotalStockCount(variants: ProductVariants): number {
    if ('stock' in variants) {
        return variants['stock'];
    } else {
        let stock = 0;

        let props = Object.keys(variants);
        if (props.length) {
            variants[props[0]].forEach((variant: Variant) => {
                let options = Object.keys(variant);
                if (options.length) {
                    stock += variant[options[0]].stock;
                }
            });
        }

        return stock;
    }
}

export function buildVariantSelection(option: string, stock: number, intialVariants: ProductVariants): ProductVariants {
    if ('stock' in intialVariants) {
        return { stock: stock };
    } else {
        let props = Object.keys(intialVariants);
        if (props.length) {
            intialVariants[props[0]].forEach((variant: Variant) => {
                let options = Object.keys(variant);
                if (options.length && options[0] === option) {
                    return { [props[0]]: { [option]: { stock: stock } } };
                }
            });
        }
    }

    return null;
}
