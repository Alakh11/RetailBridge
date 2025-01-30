// services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private httpClient: HttpClient) {}

  // Fetch all products
  getAllProducts(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }

  // Fetch a single product by ID
  getProductById(id: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${id}`);
  }

  // Create a new product
  createProduct(product: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, product);
  }

  // Update a product by ID
  updateProduct(id: string, product: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}`, product);
  }

  // Delete a product by ID
  deleteProduct(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
