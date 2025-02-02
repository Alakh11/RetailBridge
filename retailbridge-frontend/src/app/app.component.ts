import { Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';  // Your routing module
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';  // FontAwesome for icons

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',  // Router outlet to display routed components
  standalone: true,  // Mark the component as standalone
  imports: [
    AppRoutingModule,  // Add your AppRoutingModule to use routes
    FontAwesomeModule, // Add FontAwesome module to enable icon usage
  ],
})
export class AppComponent {}
