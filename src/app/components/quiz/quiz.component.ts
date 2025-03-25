import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) {}

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
  }
}
