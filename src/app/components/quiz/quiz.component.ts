import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  lastName: string | null = null;
  firstName: string | null = null;
  questionCount: number | null = null;
  categoryId: string | null = null;
  categoryLabel: string | null = null;
  quizType: string | null = null;

  questions: any[] = [];
  currentQuestionIndex: number = 0;
  currentShuffledAnswers: string[] = [];
  selectedAnswer: string = '';
  answered: boolean = false;
  feedback: string | null = null;
  correctAnswer: string | null = null;

  score: number = 0;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.lastName = params['last_name'];
      this.firstName = params['first_name'];
      this.questionCount = params['question_count']
        ? +params['question_count']
        : null;
      this.categoryId = params['categoryId'];
      this.categoryLabel = params['categoryLabel'];
      this.quizType = params['quiz_type'];
    });

    if (this.questionCount && this.categoryId && this.quizType) {
      this.apiService
        .getQuestions(this.questionCount, this.categoryId, this.quizType)
        .subscribe(
          (response: any) => {
            // console.log("Réponse de l'API:", response);
            this.questions = response.results;
            if (this.questions.length > 0 && this.quizType === 'multiple') {
              this.currentShuffledAnswers = this.shuffleAnswers(
                this.questions[0]
              );
            }
          },
          (error) => {
            console.error("Erreur lors de l'appel à l'API:", error);
          }
        );
    }
  }

  shuffleAnswers(question: any): string[] {
    const answers = [...question.incorrect_answers, question.correct_answer];
    return answers.sort(() => Math.random() - 0.5);
  }

  submitAnswer() {
    if (!this.selectedAnswer) return;

    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.correctAnswer = currentQuestion.correct_answer;
    this.feedback =
      this.selectedAnswer === this.correctAnswer ? 'Correct' : 'Incorrect';
    this.answered = true;

    if (this.feedback === 'Correct') {
      this.score++;
    }
  }

  nextQuestion() {
    this.answered = false;
    this.selectedAnswer = '';
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      if (this.quizType === 'multiple') {
        this.currentShuffledAnswers = this.shuffleAnswers(
          this.questions[this.currentQuestionIndex]
        );
      }
    } else {
      this.router.navigate(['/result'], {
        queryParams: {
          last_name: this.lastName,
          first_name: this.firstName,
          categoryLabel: this.categoryLabel,
          correctAnswers: this.score,
          totalQuestions: this.questions.length,
        },
      });
    }
  }
}
