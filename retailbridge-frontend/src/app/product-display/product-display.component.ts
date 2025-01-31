import { Component, OnInit } from '@angular/core';
import { Product, ProductApiResponse } from '../models/product.model'; // Assuming you have a product model
import { ApiService } from '../Services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.scss'],
  imports: [CommonModule],
})
export class ProductDisplayComponent implements OnInit {
  products: Product[] = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(data => {
        this.products = [data];  // Assuming you're receiving a single product object, wrap it in an array
      });
    }
    this.loadProducts();
  }

  // Load products from API
  loadProducts(): void {
    this.productService.getAllProducts().subscribe((response: ProductApiResponse) => {
      this.products = response.products; // Ensure proper assignment
    });
    
  }
}
