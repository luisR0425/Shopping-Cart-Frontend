import {Injectable} from '@angular/core';
import {Product} from '../models/product.model';
import {BehaviorSubject} from 'rxjs';
import {CartProduct} from '../models/cart.product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: CartProduct[] = [];
  private cart = new BehaviorSubject<CartProduct[]>([]);

  cart$ = this.cart.asObservable();

  constructor() { }

  addCart(product: CartProduct): void {
    if (this.products.find(p => p.productId === product.productId)) {
      return;
    }
    this.products = [...this.products, product];
    this.cart.next(this.products);
    console.log(this.products);
  }

  removeItem(product: CartProduct): void {
    this.products = this.products.filter(cp => cp.productId !== product.productId);
    this.cart.next(this.products);
    console.log(this.products);
  }
}
