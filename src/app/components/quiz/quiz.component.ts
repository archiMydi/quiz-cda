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
  // Variables to store user information and quiz settings
  lastName: string | null = null;
  firstName: string | null = null;
  questionCount: number | null = null;
  categoryId: string | null = null;
  categoryLabel: string | null = null;
  quizType: string | null = null;

  // Variables to manage quiz state
  questions: any[] = []; // List of questions fetched from the API
  currentQuestionIndex: number = 0; // Index of the current question
  currentShuffledAnswers: string[] = []; // Shuffled answers for the current question
  selectedAnswer: string = ''; // User's selected answer
  answered: boolean = false; // Whether the current question has been answered
  feedback: string | null = null; // Feedback for the user's answer
  correctAnswer: string | null = null; // Correct answer for the current question

  score: number = 0; // User's score

  constructor(
    private route: ActivatedRoute, // To access query parameters from the URL
    private apiService: ApiService, // Service to fetch questions from the API
    private router: Router // To navigate between routes
  ) {}

  ngOnInit() {
    // Subscribe to query parameters from the URL
    this.route.queryParams.subscribe((params) => {
      this.lastName = params['last_name'];
      this.firstName = params['first_name'];
      this.questionCount = params['question_count']
        ? +params['question_count'] // Convert to number if present
        : null;
      this.categoryId = params['categoryId'];
      this.categoryLabel = params['categoryLabel'];
      this.quizType = params['quiz_type'];
    });

    // Fetch questions if all required parameters are present
    if (this.questionCount && this.categoryId && this.quizType) {
      this.apiService
        .getQuestions(this.questionCount, this.categoryId, this.quizType)
        .subscribe(
          (response: any) => {
            // Store the fetched questions
            this.questions = response.results;
            // Shuffle answers for the first question if the quiz type is "multiple"
            if (this.questions.length > 0 && this.quizType === 'multiple') {
              this.currentShuffledAnswers = this.shuffleAnswers(
                this.questions[0]
              );
            }
          },
          (error) => {
            console.error("Erreur lors de l'appel à l'API:", error); // Log API errors
          }
        );
    }
  }

  // Shuffle the answers for a given question
  shuffleAnswers(question: any): string[] {
    const answers = [...question.incorrect_answers, question.correct_answer];
    return answers.sort(() => Math.random() - 0.5); // Randomize the order of answers
  }

  // Handle the submission of an answer
  submitAnswer() {
    if (!this.selectedAnswer) return; // Do nothing if no answer is selected

    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.correctAnswer = currentQuestion.correct_answer; // Get the correct answer
    this.feedback =
      this.selectedAnswer === this.correctAnswer ? 'Correct' : 'Incorrect'; // Provide feedback
    this.answered = true; // Mark the question as answered

    if (this.feedback === 'Correct') {
      this.score++; // Increment the score if the answer is correct
    }
  }

  // Move to the next question or navigate to the result page
  nextQuestion() {
    this.answered = false; // Reset the answered state
    this.selectedAnswer = ''; // Clear the selected answer
    if (this.currentQuestionIndex < this.questions.length - 1) {
      // If there are more questions, move to the next one
      this.currentQuestionIndex++;
      if (this.quizType === 'multiple') {
        // Shuffle answers for the next question if the quiz type is "multiple"
        this.currentShuffledAnswers = this.shuffleAnswers(
          this.questions[this.currentQuestionIndex]
        );
      }
    } else {
      // If no more questions, navigate to the result page with query parameters
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
