import { Component, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';

import { CartService } from '../../../core/services/cart.service';
import { Observable } from 'rxjs';
import {Cart} from '../../../core/models/cart.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  total$: Observable<number>;

  constructor(
    private cartService: CartService
  ) {
    this.total$ = this.cartService.cart$
      .pipe(
        map(products => products.length)
      );
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  save(): any {
    if (!this.getIdCart()) {
      this.cartService.saveCart().subscribe((res: Cart) => {
        localStorage.setItem('idCart', res.id.toString());
      }, error => {
        console.log(error);
      });
    } else {
      this.cartService.updateCart(this.getIdCart()).subscribe((res: Cart) => {
      }, error => {
        console.log(error);
      });
    }
  }

  checkout(): any {
    if (!this.getIdCart()) {
      return;
    }
    this.cartService.checkoutEvent(this.getIdCart());
  }

  getIdCart(): number {
    return +localStorage.getItem('idCart');
  }
}
