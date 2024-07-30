import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGenre } from '../interfaces/IGenre.interface';

@Injectable({
  providedIn: 'root'
})
export class GenresService {
  private apiUrl = 'http://localhost:8080/api/genres'; 

  constructor(private http: HttpClient) {}

  getAllGenres(): Observable<IGenre[]> {
    return this.http.get<IGenre[]>(this.apiUrl);
  }

  getGenreById(id: number): Observable<IGenre> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IGenre>(url);
  }

  addGenre(genre: IGenre): Observable<IGenre> {
    return this.http.post<IGenre>(this.apiUrl, genre, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateGenre(id: number, genre: IGenre): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<void>(url, genre, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteGenre(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
