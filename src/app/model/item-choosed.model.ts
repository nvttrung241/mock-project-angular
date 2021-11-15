import { ItemInCart } from './item-in-cart.model';

export class ItemChoosed {
    customerId: string;
    customerName: string;
    items: ItemInCart[] = [];
}