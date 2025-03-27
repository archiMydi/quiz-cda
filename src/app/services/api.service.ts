import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Marks this service as injectable and available at the root level of the application
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Base URL for the Open Trivia Database API
  private apiUrl: string = 'https://opentdb.com/';

  // Injects the HttpClient service for making HTTP requests
  constructor(private http: HttpClient) {}

  /**
   * Fetches the list of trivia categories from the API.
   * @returns An Observable containing the API response.
   */
  getCategories(): Observable<any> {
    return this.http.get(this.apiUrl + 'api_category.php');
  }

  /**
   * Fetches trivia questions from the API based on the provided parameters.
   * @param amount - Number of questions to fetch.
   * @param category - The category ID for the questions.
   * @param type - The type of questions (e.g., multiple choice or true/false).
   * @returns An Observable containing the decoded API response.
   */
  getQuestions(
    amount: number,
    category: string,
    type: string
  ): Observable<any> {
    return (
      this.http
        .get(
          this.apiUrl +
            `api.php?amount=${amount}&category=${category}&type=${type}&encode=base64`
        )
        // Decodes the base64-encoded response using the decodeBase64 method
        .pipe(map((response) => this.decodeBase64(response)))
    );
  }

  /**
   * Recursively decodes base64-encoded data.
   * Handles strings, arrays, and objects.
   * @param data - The data to decode.
   * @returns The decoded data.
   */
  private decodeBase64(data: any): any {
    if (typeof data === 'string') {
      try {
        // Decodes base64 strings
        return atob(data);
      } catch (error) {
        // Returns the original data if decoding fails
        return data;
      }
    } else if (Array.isArray(data)) {
      // Recursively decodes each element in an array
      return data.map((item) => this.decodeBase64(item));
    } else if (data !== null && typeof data === 'object') {
      // Recursively decodes each property in an object
      const decodedObject: any = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          decodedObject[key] = this.decodeBase64(data[key]);
        }
      }
      return decodedObject;
    }
    // Returns the data as-is if it's not a string, array, or object
    return data;
  }
}
