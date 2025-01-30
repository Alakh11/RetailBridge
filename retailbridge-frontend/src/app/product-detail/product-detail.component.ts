// components/product-detail/product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  imports: [CommonModule]
})
export class ProductDetailComponent implements OnInit {
  product: any;
  //product: Product | null = null;

  reviews = [
    { user: 'Alice', comment: 'Great quality!' },
    { user: 'Bob', comment: 'Worth the price!' },
  ];
  

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  ngOnInit() {
    this.getProduct();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const productData = [
        {
          id: 1,
          name: 'Air Max',
          brand: 'Nike',
          price: 120,
          image: ' images/airmax.jpg',
          description: 'High-performance sneakers with great comfort.',
        },
        {
          id: 2,
          name: 'Ultraboost',
          brand: 'Adidas',
          price: 150,
          image: 'images/ultraboost.webp',
          description: 'Stylish sneakers with exceptional cushioning.',
        },
        {
          id: 3,
          name: 'Classic',
          brand: 'Reebok',
          price: 100,
          image: 'images/classic.jpg',
          description: 'Timeless design with unmatched durability.',
        },
      ];
      this.product = productData.find(product => product.id === +id);
    }
  }
  getProduct(): void {
    const productId = this.route.snapshot.paramMap.get('id'); // Get product ID from route
    if (productId) {
      this.apiService.getProduct(productId).subscribe((product) => {
        this.product = product;
      });
    }
  }
  isAdminOrSupport(): boolean {
    // Logic for checking if the user is an admin or support
    return false; // Replace with actual logic for admin/support check
  }
}
