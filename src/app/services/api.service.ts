import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl: string = 'https://opentdb.com/';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(this.apiUrl + 'api_category.php');
  }

  getQuestions(
    amount: number,
    category: string,
    type: string
  ): Observable<any> {
    return this.http
      .get(
        this.apiUrl +
          `api.php?amount=${amount}&category=${category}&type=${type}&encode=base64`
      )
      .pipe(map((response) => this.decodeBase64(response)));
  }

  private decodeBase64(data: any): any {
    if (typeof data === 'string') {
      try {
        return atob(data);
      } catch (error) {
        return data;
      }
    } else if (Array.isArray(data)) {
      return data.map((item) => this.decodeBase64(item));
    } else if (data !== null && typeof data === 'object') {
      const decodedObject: any = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          decodedObject[key] = this.decodeBase64(data[key]);
        }
      }
      return decodedObject;
    }
    return data;
  }
}
