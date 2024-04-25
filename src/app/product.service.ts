import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  STORAGE_KEY: string = 'products';
  private products: Product[] = [];
  private productsSubject = new BehaviorSubject<Product[]>(this.products);

  addProduct(product: Product): void {
    console.log("JUAN", product);
    let products: Product[] = [];
    const storedProducts = localStorage.getItem(this.STORAGE_KEY);
    if (storedProducts) {
      console.log("HOLAAA");
      products = JSON.parse(storedProducts);
    } else {
      console.log("HOLAAA");
    }
    products.push(product);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
    this.productsSubject.next(products);
  }

  getProducts(): Observable<Product[]> {
    const storedProducts = localStorage.getItem(this.STORAGE_KEY);
    const products: Product[] = storedProducts ? JSON.parse(storedProducts) : [];
    this.productsSubject.next(products);
    return this.productsSubject.asObservable();
  }
}