import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/routes';
import { ProductListComponent } from './app/product-list/product-list.component';

if (process.env['NODE_ENV'] === 'production') {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot([
        { path: '', component: ProductListComponent }
      ])
    ),
    provideRouter(routes), // Provide your routes
    provideHttpClient(),   // Provide the HTTP client
  ],
}).catch(err => console.error(err));
