// components/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { Product } from '../models/product.model';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class ProductListComponent {
  searchQuery: string = '';
 /* products = [
    { id: 1, name: 'Air Max', brand: 'Nike', price: 120, image: 'images/airmax.jpg' },
    { id: 2, name: 'Ultraboost', brand: 'Adidas', price: 150, image: 'images/ultraboost.webp' },
    { id: 3, name: 'Classic', brand: 'Reebok', price: 100, image: 'images/classic.jpg' },
  ];*/
products: any[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  viewDetails(id: number) {
    this.router.navigate(['/product', id]);
  }
  get filteredProducts() {
    return this.products.filter(product => 
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(() => {
      //this.products = this.products.filter((product) => product.id !== id);
    });
  }
}