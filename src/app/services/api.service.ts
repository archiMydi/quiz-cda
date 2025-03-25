import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl: string = 'https://opentdb.com/';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(this.apiUrl + 'api_category.php');
  }

  getQuestions(amount: number, category: string, type: string) {
    return this.http.get(
      this.apiUrl + `api.php?amount=${amount}&category=${category}&type=${type}`
    );
  }
}
