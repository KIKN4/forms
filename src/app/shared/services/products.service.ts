import { Injectable, inject } from '@angular/core';
import { PRODUCTS } from '../../mock-data';
import { Product } from '../types/product';
import { BehaviorSubject } from 'rxjs';
import { ENVIRONMENT } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private env = inject(ENVIRONMENT);
  private baseUrl = `${this.env}/shop/products`;
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
}
