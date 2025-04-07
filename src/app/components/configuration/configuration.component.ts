import { NgFor, NgForOf } from '@angular/common'; // Importing Angular directives for iterating over collections
import { Component, OnInit } from '@angular/core'; // Importing Component decorator and OnInit lifecycle hook
import { FormsModule } from '@angular/forms'; // Importing FormsModule for template-driven forms
import { Router } from '@angular/router'; // Importing Router for navigation
import { ApiService } from '../../services/api.service'; // Importing a custom service for API calls

@Component({
  selector: 'app-configuration', // Component selector used in templates
  imports: [FormsModule, NgFor, NgForOf], // Declaring imported modules and directives
  templateUrl: './configuration.component.html', // Path to the component's HTML template
  styleUrls: ['./configuration.component.scss'], // Path to the component's styles
})
export class ConfigurationComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiService) {}
  // Injecting Router for navigation and ApiService for API interactions

  // Form fields and configuration variables
  last_name: string = ''; // Stores the user's last name
  first_name: string = ''; // Stores the user's first name
  question_count: number = 5; // Default number of questions for the quiz
  categoryId: string = ''; // Selected category ID
  categoryLabel: string = ''; // Label of the selected category
  quiz_type: string = 'QCM'; // Default quiz type (e.g., QCM)
  categories: any[] = []; // Array to store quiz categories fetched from the API

  // Lifecycle hook that runs when the component is initialized
  ngOnInit() {
    // Fetching quiz categories from the API
    this.apiService.getCategories().subscribe((response: any) => {
      this.categories = response.trivia_categories; // Assigning fetched categories to the local variable
    });
  }

  // Updates the category label based on the selected category ID
  updateCategoryLabel() {
    const selectedCategory = this.categories.find(
      (cat) => cat.id == this.categoryId // Finding the category with the matching ID
    );
    this.categoryLabel = selectedCategory ? selectedCategory.name : '';
    // If a category is found, set its name as the label; otherwise, set an empty string
  }

  // Handles form submission and navigates to the quiz page with query parameters
  onSubmit() {
    const queryParams = {
      last_name: this.last_name, // User's last name
      first_name: this.first_name, // User's first name
      question_count: this.question_count, // Number of questions for the quiz
      categoryId: this.categoryId, // Selected category ID
      categoryLabel: this.categoryLabel, // Selected category label
      quiz_type: this.quiz_type, // Selected quiz type
    };

    // Navigating to the quiz page with the specified query parameters
    this.router.navigate(['/quiz'], { queryParams: queryParams });
  }
}
