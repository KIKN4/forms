import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/types/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  product: Product | null = null;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.product = this.productsService.getProductById(id);
      }
    });
  }
}
