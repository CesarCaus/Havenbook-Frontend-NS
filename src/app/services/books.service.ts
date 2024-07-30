import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBook } from '../interfaces/IBook.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl = 'http://localhost:8080/api/books'; 

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.apiUrl);
  }

  getBookById(id: number): Observable<IBook> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IBook>(url);
  }

  addBook(book: IBook): Observable<IBook> {
    return this.http.post<IBook>(this.apiUrl, book, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateBook(id: number, book: IBook): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<void>(url, book, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteBook(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
