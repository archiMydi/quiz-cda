import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Decorator defining metadata for the component
@Component({
  selector: 'app-result', // The selector used to include this component in templates
  templateUrl: './result.component.html', // Path to the HTML template for this component
  styleUrls: ['./result.component.scss'], // Path to the SCSS styles for this component
})
export class ResultComponent implements OnInit {
  // Properties to store data passed via query parameters
  lastName: string = ''; // User's last name
  firstName: string = ''; // User's first name
  categoryLabel: string = ''; // Quiz category label
  correctAnswers: number = 0; // Number of correct answers
  totalQuestions: number = 0; // Total number of questions in the quiz

  // Constructor to inject Angular services
  constructor(private route: ActivatedRoute, private router: Router) {}

  // Lifecycle hook that runs after the component is initialized
  ngOnInit() {
    // Subscribe to query parameters from the route
    this.route.queryParams.subscribe((params) => {
      // Retrieve and assign query parameters to component properties
      this.lastName = params['last_name'] || ''; // Default to an empty string if not provided
      this.firstName = params['first_name'] || ''; // Default to an empty string if not provided
      this.categoryLabel = params['categoryLabel'] || ''; // Default to an empty string if not provided
      this.correctAnswers = params['correctAnswers']
        ? +params['correctAnswers'] // Convert to a number if provided
        : 0; // Default to 0 if not provided
      this.totalQuestions = params['totalQuestions']
        ? +params['totalQuestions'] // Convert to a number if provided
        : 0; // Default to 0 if not provided
    });
  }

  // Method to navigate back to the quiz configuration page
  replayQuiz() {
    this.router.navigate(['/config']); // Redirects the user to the '/config' route
  }
}
