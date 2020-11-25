import {CartProduct} from './cart.product.model';

export interface Cart {
  id?: number;
  cartProductList?: CartProduct[];
}
