// Importing necessary modules from Angular core and router packages
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Defining the component metadata
@Component({
  selector: 'app-home', // The selector used to include this component in templates
  templateUrl: './home.component.html', // Path to the HTML template for this component
  styleUrls: ['./home.component.scss'], // Path to the SCSS styles for this component
})
export class HomeComponent {
  // Injecting the Angular Router service into the component via the constructor
  constructor(private router: Router) {}

  // Method to navigate to the '/config' route when called
  startGame() {
    this.router.navigate(['/config']);
  }
}
