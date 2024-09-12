import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environment/environment';
import { Subject } from '../model/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private baseUrl = `${environment.apiUrl}/subjects`;

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.baseUrl}/all`);
  }

  addSubject(subject: Subject): Observable<Subject> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    alert('Subject added');
    return this.http.post<Subject>(`${this.baseUrl}/save`, subject, { headers });
  }

}
