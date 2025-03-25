import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent implements OnInit {
  lastName: string | null = null;
  firstName: string | null = null;
  questionCount: number | null = null;
  category: string | null = null;
  quizType: string | null = null;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.lastName = params['last_name'];
      this.firstName = params['first_name'];
      this.questionCount = params['question_count']
        ? +params['question_count']
        : null;
      this.category = params['category'];
      this.quizType = params['quiz_type'];
    });

    console.log({
      lastName: this.lastName,
      firstName: this.firstName,
      questionCount: this.questionCount,
      category: this.category,
      quizType: this.quizType,
    });

    if (this.questionCount && this.category && this.quizType) {
      this.apiService
        .getQuestions(this.questionCount, this.category, this.quizType)
        .subscribe(
          (response) => {
            console.log("Réponse de l'API:", response);
          },
          (error) => {
            console.error("Erreur lors de l'appel à l'API:", error);
          }
        );
    }
  }
}
