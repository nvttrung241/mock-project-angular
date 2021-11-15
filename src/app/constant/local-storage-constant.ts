export class GlobalConstants {
    public static SHOP_ID: string = 'shopId';
    public static CART_ID: string = 'cartId';
    public static CUSTOMER_INFO: string = 'customerInfo';
    public static CUSTOMER_ID: string = 'customerId';
    public static SHOP_INFO: string = 'shopInfo';
    public static PREVIOUS_URL: string = 'previousUrl';

    public static statusList = [
        { value: '0', text: null },
        { value: '1', text: 'Confirmed' },
        { value: '2', text: 'Sent To Kitchen' },
        { value: '3', text: 'Ready for Pickup' },
        { value: '4', text: 'Delivered' },
    ];
}