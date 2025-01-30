import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { UtilService } from '../Services/util.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { faPencilAlt, faTimes, faCoffee, faPencil } from '@fortawesome/free-solid-svg-icons';


interface Product {
  productId: string;
  price: number;
  name: string;
  description: SafeHtml; // Updated type to SafeHtml
  details: SafeHtml; // Updated type to SafeHtml
}

interface ProductApiResponse {
  items: Product[];
  totalCount: number;
}

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  isAdmin: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 4;
  errorMessage: string = '';
  successMessage: string = '';
  totalProductCount: number = 0;
  isLoading: boolean = false;
  faCoffee = faCoffee;
  faPencilAlt = faPencilAlt;
  faTimes = faTimes;
  faPencil = faPencil;

  constructor(
    private apiService: ApiService,
    private utilService: UtilService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.utilService.isAdmin();
    if (this.isAdmin) {
      this.loadProducts();
    } else {
      this.errorMessage = 'Only administrators can access this page';
    }
  }

  async loadProducts(): Promise<void> {
  this.isLoading = true; // Start loading
  const skip = (this.currentPage - 1) * this.itemsPerPage;

  try {
    // Ensure response is typed
    const response : ProductApiResponse = await this.apiService
      .getProducts({ skip, limit: this.itemsPerPage })
      .toPromise();

    // Add a fallback for undefined response
    if (response) {
      this.products = response.items.map((product: any) => ({
        ...product,
        description: this.sanitizer.bypassSecurityTrustHtml(product.description as string),
        details: this.sanitizer.bypassSecurityTrustHtml(product.details as string),
      }));
      this.totalProductCount = response.totalCount;
    } else {
      throw new Error('Invalid API response: undefined');
    }
  } catch (error: any) {
    console.error('Error fetching products:', error);
    this.errorMessage = error?.message || 'Failed to load products';
  } finally {
    this.isLoading = false; // Stop loading
  }
}


  deleteProduct(productId: string): void {
    this.apiService.deleteProduct(productId).subscribe(
      () => {
        this.successMessage = 'Product deleted successfully!';
        this.loadProducts();
      },
      (error) => {
        this.errorMessage = error?.message || 'Failed to delete product';
        console.error('Error deleting product:', error);
      }
    );
  }

  get totalPages(): number {
    return Math.ceil(this.totalProductCount / this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }
}
