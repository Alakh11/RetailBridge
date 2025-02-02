import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { ProfileComponent } from './profile/profile.component';

// Define routes for the application
const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'product-management', component: ProductManagementComponent },
  { path: 'product-display', component: ProductDisplayComponent },
  { path: 'profile/:id', component: ProfileComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes), // Configuring the routes for the application
  ],
  exports: [RouterModule], // RouterModule to make it available in other modules
})
export class AppRoutingModule {}
