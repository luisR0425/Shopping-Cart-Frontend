import { Component, OnInit } from '@angular/core';
import {Product} from '../../../core/models/product.model';
import {ProductService} from '../../../core/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productsService: ProductService
  ) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getProducts();
  }

  clickProduct(): any {
  }

  getProducts(): any {
    this.productsService.getAllProducts()
      .subscribe(products => {
        console.log(products);
        this.products = products;
      });
  }
}
