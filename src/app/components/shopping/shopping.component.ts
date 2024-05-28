import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../api.service';
import { Product, ProductService } from '../../product.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
})

export class ShoppingComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  private productSubscription: Subscription = new Subscription;


  constructor(private productService: ProductService, private ApiService: ApiService) { }

  ngOnInit(): void {
    this.ApiService.getItems().subscribe((products) => {
      this.products = products;
    });
    /*     this.productSubscription = this.productService.getProducts().subscribe((products) => {
           this.products = products;
           console.log(this.products);
         }); */
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }
}