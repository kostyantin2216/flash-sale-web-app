export interface DetailedProduct {
    name: string;
    brand: string;
    images: {url: string, thumbnailUrl: string}[];
    price: number;
    retailPrice: number;
    features: string[];
    description: string;
    shippingPrice: number;
}
