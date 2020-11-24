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

  ngOnInit() {
    this.fetchProducts();
  }

  clickProduct(id: number): any {
    console.log('product');
    console.log(id);
  }

  fetchProducts(): any {
    this.productsService.getAllProducts()
      .subscribe(products => {
        console.log(products);
        this.products = products;
      });
  }
}
