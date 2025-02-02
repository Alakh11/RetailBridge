import { Component, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../Services/api.service'; // Adjust the import based on your project structure
import { DomSanitizer } from '@angular/platform-browser';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  errorMessage = '';

  constructor(
    private apiService: ApiService, // Assuming you have a service for API calls
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id'); // Get the ID from route parameters
    if (userId) {
      this.fetchUserProfile(userId);
    } else {
      this.errorMessage = 'User ID is missing';
    }
  }

  fetchUserProfile(userId: string): void {
    this.apiService.getUser(userId).pipe(
      catchError((error) => {
        this.errorMessage = 'Failed to load user profile';
        return of(null); // Return a default empty value if error occurs
      })
    ).subscribe((profileData) => {
      if (profileData) {
        this.user = profileData;
      }
    });
  }

  // Use DomSanitizer for any necessary HTML sanitization
  sanitizeData(data: string): string {
    return this.sanitizer.sanitize(SecurityContext.HTML, data) || '';
  }
}
