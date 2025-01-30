import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductApiResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  // Private method to get Auth headers with Bearer token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('shoppyToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // User-related methods
  getUser(userId: string): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  updateUser(userId: string, body: any): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.put(url, body, { headers: this.getAuthHeaders() });
  }

  getOrders(): Observable<any> {
    const userId = localStorage.getItem('shoppyUserId');
    const roles = localStorage.getItem('shoppyRoles')?.split(',') || [];
    const url = roles.includes('admin') || roles.includes('support')
      ? `${this.apiUrl}/orders`
      : `${this.apiUrl}/users/${userId}/orders`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  makeOrder(body: any): Observable<any> {
    const userId = localStorage.getItem('shoppyUserId');
    const userName = localStorage.getItem('shoppyUserName');
    const url = `${this.apiUrl}/users/${userId}/orders`;
    return this.http.post(
      url,
      { ...body, userId, userName },
      { headers: this.getAuthHeaders() }
    );
  }

  // Shopping Cart related methods
  addToCart(body: any): Observable<any> {
    const userId = localStorage.getItem('shoppyUserId');
    const url = `${this.apiUrl}/shoppingCarts/${userId}/items`;
    return this.http.post(url, body, { headers: this.getAuthHeaders() });
  }

  deleteShoppingCart(): Observable<any> {
    const userId = localStorage.getItem('shoppyUserId');
    if (userId) {
      const url = `${this.apiUrl}/shoppingCarts/${userId}`;
      return this.http.delete(url, { headers: this.getAuthHeaders() });
    }
    return new Observable(); // Return empty observable if no userId
  }

  getShoppingCartItems(): Observable<any> {
    const userId = localStorage.getItem('shoppyUserId');
    const url = `${this.apiUrl}/shoppingCarts/${userId}`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  updateCart(items: any[]): Observable<any> {
    const userId = localStorage.getItem('shoppyUserId');
    const url = `${this.apiUrl}/shoppingCarts/${userId}`;
    return this.http.put(url, { userId, items }, { headers: this.getAuthHeaders() });
  }

  // User Authentication methods
  signUp(body: any): Observable<any> {
    const url = `${this.apiUrl}/users`;
    return this.http.post(url, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  logIn(body: any): Observable<any> {
    const url = `${this.apiUrl}/users/login`;
    return this.http.post(url, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  forgotPassword(body: any): Observable<any> {
    const url = `${this.apiUrl}/users/forgot-password`;
    return this.http.put(url, body, { headers: this.getAuthHeaders() });
  }

  passwordResetInit(body: any): Observable<any> {
    const url = `${this.apiUrl}/users/reset-password/init`;
    return this.http.post(url, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  passwordResetFinish(body: any): Observable<any> {
    const url = `${this.apiUrl}/users/reset-password/finish`;
    return this.http.put(url, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  me(): Observable<any> {
    const url = `${this.apiUrl}/users/me`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  // Product-related methods
  /*getProducts(skip = 0, limit = 4): Observable<any> {
    const url = `${this.apiUrl}/products?filter[skip]=${skip}&filter[limit]=${limit}`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }*/
    getProducts(params: { skip: number; limit: number; category?: string }): Observable<ProductApiResponse> {
      return this.http.get<ProductApiResponse>(`${this.apiUrl}/products`, { params });
    }
    

  getProduct(id: string): Observable<any> {
    const url = `${this.apiUrl}/products/${id}`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  deleteProduct(id: string): Observable<any> {
    const url = `${this.apiUrl}/products/${id}`;
    return this.http.delete(url, { headers: this.getAuthHeaders() });
  }

  createProduct(product: any): Observable<any> {
    const url = `${this.apiUrl}/products`;
    return this.http.post(url, product, { headers: this.getAuthHeaders() });
  }
}
