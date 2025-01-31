import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';  // HTTP client module to make API calls
import { RouterModule } from '@angular/router';  
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';  // FontAwesome support for icons
import { AppRoutingModule } from './app-routing.module'; 
import { BrowserModule } from '@angular/platform-browser';  // Browser module for browser platform support
import { SanitizePipe } from './sanitize.pipe';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common'; // CommonModule for Angular directives like ngIf, ngFor

@NgModule({
  imports: [
    BrowserModule, // BrowserModule should be first
    CommonModule, // CommonModule for basic Angular functionality
    HttpClientModule, // HTTP client module for API requests
    RouterModule, // RouterModule for routing support
    AppRoutingModule, // Routing module to handle routes
    FontAwesomeModule, // FontAwesome module to support icons
    SanitizePipe, // Import the standalone pipe
    ProfileComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Allow custom elements in templates
  providers: [],
})
export class AppModule {}

// Bootstrap the standalone AppComponent
import { bootstrapApplication } from '@angular/platform-browser';
import { ProfileComponent } from './profile/profile.component';
bootstrapApplication(AppComponent);