import {CartProductModel} from './cart.product.model';

export interface Cart {
  id?: number;
  cartProductList?: CartProductModel[];
}
