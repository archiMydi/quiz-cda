import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  lastName: string = '';
  firstName: string = '';
  categoryLabel: string = '';
  correctAnswers: number = 0;
  totalQuestions: number = 0;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.lastName = params['last_name'] || '';
      this.firstName = params['first_name'] || '';
      this.categoryLabel = params['categoryLabel'] || '';
      this.correctAnswers = params['correctAnswers']
        ? +params['correctAnswers']
        : 0;
      this.totalQuestions = params['totalQuestions']
        ? +params['totalQuestions']
        : 0;
    });
  }

  replayQuiz() {
    this.router.navigate(['/config']);
  }
}
