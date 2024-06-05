import { Component, OnInit, inject } from '@angular/core';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { ProductsFilterPipe } from '../../shared/pipes/products-filter.pipe';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/types/product';
import { ActivatedRoute, Router } from '@angular/router';

type Direction = 'asc' | 'desc';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, FormsModule, ProductsFilterPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  priceSort: Direction = 'asc';
  products: Product[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.products$.subscribe((products) => {
      this.products = products;
    });
    this.activatedRoute.queryParamMap.subscribe((queryParamMap) => {
      const direction = queryParamMap.get('priceSort') as Direction | null;
      if (direction) {
        this.priceSort = direction;
        this.products = this.products.sort((a, b) => {
          if (direction === 'desc') {
            return b.price.current - a.price.current;
          } else {
            return a.price.current - b.price.current;
          }
        });
      }
    })
  }

  onAddToCart(id: string) {
    this.productsService.addToCart(id);
  }

  onPriceSortChange() {
    this.router.navigate([''], {
      queryParams: {
        priceSort: this.priceSort,
      },
    });
  }
}
