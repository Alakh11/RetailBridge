// components/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { Product } from '../models/product.model';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, RouterModule]
})
export class ProductListComponent {
  products = [
    { id: 1, name: 'Air Max', brand: 'Nike', price: 120, image: 'images/airmax.jpg' },
    { id: 2, name: 'Ultraboost', brand: 'Adidas', price: 150, image: 'images/ultraboost.webp' },
    { id: 3, name: 'Classic', brand: 'Reebok', price: 100, image: 'images/classic.jpg' },
  ];

  constructor(private productService: ProductService, private router: Router) {}

  viewDetails(id: number) {
    this.router.navigate(['/product', id]);
  }

  /*ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }*/
}