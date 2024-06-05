import { Injectable, inject } from '@angular/core';
import { PRODUCTS } from '../../mock-data';
import { Product } from '../types/product';
import { BehaviorSubject } from 'rxjs';
import { ENVIRONMENT } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GetProductsResponse } from '../types/response';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private httpClient = inject(HttpClient);
  private env = inject(ENVIRONMENT);
  private baseUrl = `${this.env.apiURL}/shop/products`;
  products$ = new BehaviorSubject<Product[]>(PRODUCTS);
  cartProducts$ = new BehaviorSubject<Product[]>([]);

  addToCart(productId: string) {
    const product = this.products$.value.find((prod) => prod._id === productId);
    if (product) {
      const updatedCart = [...this.cartProducts$.value, product];
      this.cartProducts$.next(updatedCart);
    }
  }

  deleteFromCart(id: string) {
    const updatedProducts = this.cartProducts$.value.filter(
      (prod) => prod._id !== id,
    );
    this.cartProducts$.next(updatedProducts);
  }

  getProductById(id: string) {
    return this.products$.value.find((prod) => prod._id === id) || null;
  }

  getProducts(page_size = 50, page_index = 1) {
    console.log('test');

    return this.httpClient.get<GetProductsResponse>(`${this.baseUrl}/all`, {
      params: { page_size, page_index },
    });
  }
}
