import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3008/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  getItems(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/items`);
  }

  addItem(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + '/items', JSON.stringify(product), this.httpOptions);
  }

  updateItem(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/items/${product.id}`, product);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/items/${id}`);
  }
}
