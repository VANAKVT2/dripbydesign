import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService, Product } from '../../product.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
})

export class ShoppingComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  private productSubscription: Subscription = new Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productSubscription = this.productService.getProducts().subscribe((products) => {
      this.products = products;
      console.log(this.products);
    });
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }
}