import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';  // HTTP client module to make API calls
import { RouterModule } from '@angular/router';  
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';  // FontAwesome support for icons
import { AppRoutingModule } from './app-routing.module'; 
import { BrowserModule } from '@angular/platform-browser';  // Browser module for browser platform support
import { SanitizePipe } from './sanitize.pipe';
import { ProductManagementComponent } from './product-management/product-management.component';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';// CommonModule for Angular directives like ngIf, ngFor

@NgModule({
    declarations: [ 
        
      ],
    
  imports: [
    HttpClientModule,      //  HTTP client module for API requests
    CommonModule,           //  CommonModule for basic Angular functionality
    RouterModule,          //  RouterModule for routing support
    AppRoutingModule,      //  routing module to handle routes
    FontAwesomeModule,     //  FontAwesome module to support icons
    BrowserModule,         //  BrowserModule for the browser platform
    AppComponent,
    SanitizePipe,
    ProductManagementComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Allow custom elements in templates
  providers: [],
  bootstrap: [] 
})
export class AppModule {}
