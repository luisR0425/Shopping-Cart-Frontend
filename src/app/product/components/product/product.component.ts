import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../core/models/product.model';
import {CartService} from '../../../core/services/cart.service';
import {FormControl, Validators} from '@angular/forms';
import {CartProduct} from '../../../core/models/cart.product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();

  inputQuantity: FormControl;
  obligatedQuantity = false;

  constructor(
    private cartService: CartService
  ) {
    this.inputQuantity = new FormControl(null, [Validators.required]);
    this.cartService.checkoutEvent$.subscribe(res => {
      if (res) {
        this.inputQuantity.reset();
      }
    });
  }

  ngOnInit(): void {
  }

  addCart(): void {
    if (this.inputQuantity.invalid || this.inputQuantity.value === 0) {
      this.obligatedQuantity = true;
      return;
    } else {
      this.obligatedQuantity = false;
    }
    this.cartService.addCart(this.getCartProduct());
  }

  removeItem(): void {
    if (this.getIdCart()) {
      this.cartService.removeItemCart(this.getIdCart(), this.getCartProduct());
    } else {
      this.cartService.removeItem(this.getCartProduct());
    }
  }

  getCartProduct(): CartProduct {
    return {
      productId: this.product.id,
      quantity: this.inputQuantity.value
    };
  }

  getIdCart(): number {
    return +localStorage.getItem('idCart');
  }
}
