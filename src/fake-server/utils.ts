import { IProduct } from '../interfaces/product';
import { ICategory } from '../interfaces/category';

export function makeIdGenerator(): () => number {
    let lastId = 0;

    return () => {
        lastId += 1;

        return lastId;
    };
}

export function nameToSlug(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]/, '-').replace(/-+/, '-');
}

export function categoryHasProducts(category: ICategory, products: IProduct[]): boolean {
    return products.filter((product) => (
        product.categories.findIndex((x) => x.slug === category.slug) !== -1
    )).length > 0;
}

export function delayResponse<T>(delay: number, response: T): Promise<T> {
    return new Promise<T>((resolve) => {
        setTimeout(() => resolve(response), process.browser ? delay : 0);
    });
}
