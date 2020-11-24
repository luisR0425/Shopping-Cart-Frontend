import { Component, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';

import { CartService } from './../../../core/services/cart.service';
import { Observable } from 'rxjs';

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

  save(): any {
    console.log('save');
  }

  checkout(): any {
    console.log('checkout');
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

}
