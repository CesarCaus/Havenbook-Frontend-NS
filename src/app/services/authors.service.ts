import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthor } from '../interfaces/IAuthor.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private apiUrl = 'http://localhost:8080/api/authors'; 

  constructor(private http: HttpClient) {}

  getAllAuthors(): Observable<IAuthor[]> {
    return this.http.get<IAuthor[]>(this.apiUrl);
  }

  getAuthorById(id: number): Observable<IAuthor> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IAuthor>(url);
  }

  addAuthor(author: IAuthor): Observable<IAuthor> {
    return this.http.post<IAuthor>(this.apiUrl, author, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateAuthor(id: number, author: IAuthor): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<void>(url, author, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteAuthor(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
