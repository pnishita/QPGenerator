import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environment/environment';
import { Question } from '../model/question.model';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  private baseUrl = `${environment.apiUrl}/generate`;

  constructor(private http: HttpClient) {}

  getQuestions(numberOfQuestions: number, subjectID: number): Observable<Question[]> {
    const url = `${this.baseUrl}/getquestions/v1/${numberOfQuestions}/${subjectID}`;
    console.log('Making GET request to URL:', url);  
    return this.http.get<Question[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  getQuestionsPdf(numberOfQuestions: number, subjectID: number): Observable<Blob> {
    const url = `${this.baseUrl}/getquestions/v1/${numberOfQuestions}/${subjectID}/pdf`;
    console.log('Making GET request to URL:', url);  
    return this.http.get(url, { responseType: 'blob' }).pipe(
      catchError(this.handleError)
    );
  }

  addQuestion(question: any): Observable<any> {
    return this.http.post('http://localhost:8084/addQuestion', question).pipe(
      catchError(this.handleError)
    );
  }

  addQuestions(questions: any[]): Observable<any> {
    return this.http.post('http://localhost:8084/addAllQuestion', questions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}