import { Item } from './item.model';

export type ShopInfo = {
    shopId: string;
    name: string;
    items: Item[];
    image: string;
    phoneNumber: string;
    errorMessage: string
}