// models/product.model.ts
export interface Product {
    id: string;
    productId?: string; 
    name: string;
    price: number;
    description: string;
    details?: string; 
    brand: string;
    imageUrl: string;
    image: string;
  }
  export interface ProductApiResponse {
    products: Product[];
  }
  