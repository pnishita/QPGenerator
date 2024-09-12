import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../model/question.model';
import { environment } from '../environment/environment.developement';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8084'; 
  getQuestionsBySubject(subjectId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/getQuestionsbySub/${subjectId}`);
  }


  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/getallquestions`);
  }

  deleteQuestion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletequestion/${id}`);
  }

  addQuestion(question: Question): Observable<any> {
    return this.http.post(`${this.apiUrl}/addQuestion`, question);
  }

  addAllQuestion(questions:Question[]):Observable<any>{
    return this.http.post(`${this.apiUrl}/addAllQuestions`, questions)
  }

}