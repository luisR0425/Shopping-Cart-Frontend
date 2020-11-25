import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {CartProduct} from '../models/cart.product.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';
import {Cart} from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: CartProduct[] = [];
  private cart = new BehaviorSubject<CartProduct[]>([]);
  private checkoutOB = new BehaviorSubject<boolean>(false);

  cart$ = this.cart.asObservable();
  checkoutEvent$ = this.checkoutOB.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  save(cart: Cart): Observable<any> {
    return this.http.post(`${environment.url_api}/api/cart/save`, cart);
  }

  update(cart: Cart): Observable<any> {
    return this.http.post(`${environment.url_api}/api/cart/update`, cart);
  }

  delete(cartId: number, productId: number): Observable<any> {
    return this.http.delete(`${environment.url_api}/api/cart/delete/${cartId}/${productId}`);
  }

  checkout(cartId: number): Observable<any> {
    return this.http.post(`${environment.url_api}/api/cart/checkout/${cartId}`, null);
  }

  clearProductList(): void {
    this.products = [];
    this.cart.next(this.products);
  }

  addCart(product: CartProduct): void {
    if (this.products.find(p => p.productId === product.productId)) {
      return;
    }
    this.products = [...this.products, product];
    this.cart.next(this.products);
    console.log(this.products);
  }

  saveCart(): Observable<any> {
    const cart = {
      cartProductList: this.products
    };
    return this.save(cart).pipe(
      catchError(this.handleError));
  }

  updateCart(idCart): Observable<any> {
    const cart: Cart = {
      id: idCart,
      cartProductList: this.products
    };
    return this.update(cart).pipe(
      catchError(this.handleError));
  }

  removeItem(product: CartProduct): void {
    this.products = this.products.filter(cp => cp.productId !== product.productId);
    this.cart.next(this.products);
    console.log(this.products);
  }

  removeItemCart(cartId: number, product: CartProduct): void {
    this.delete(cartId, product.productId)
      .pipe(catchError(this.handleError)).subscribe(res => {
        this.removeItem(product);
    });
  }

  checkoutEvent(cartId: number): void {
    this.checkout(cartId).pipe(catchError(this.handleError))
      .subscribe(res => {
        localStorage.setItem('idCart', null);
        this.clearProductList();
        this.checkoutOB.next(true);
    }, error => {
        console.log(error);
    });
  }

  protected handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocurrio un error:', error.error.message);
    } else {
      console.error(
        `Backend codigo error ${error.status}, ` + `body was: ${error.error}`
      );
    }

    return throwError(error);
  }
}
