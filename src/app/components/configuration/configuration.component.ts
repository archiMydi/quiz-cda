import { NgFor, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-configuration',
  imports: [FormsModule, NgFor, NgForOf],
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiService) {}

  last_name: string = '';
  first_name: string = '';
  question_count: number = 5;
  category: string = 'Catégorie 1';
  quiz_type: string = 'QCM';
  categories: any[] = [];

  ngOnInit() {
    this.apiService.getCategories().subscribe((response: any) => {
      this.categories = response.trivia_categories;
    });
  }

  onSubmit() {
    const queryParams = {
      last_name: this.last_name,
      first_name: this.first_name,
      question_count: this.question_count,
      category: this.category,
      quiz_type: this.quiz_type,
    };

    this.router.navigate(['/quiz'], { queryParams: queryParams });
  }
}
