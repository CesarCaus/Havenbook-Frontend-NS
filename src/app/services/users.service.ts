import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:8080/api/users'; 

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<IUser> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IUser>(url);
  }

  addUser(User: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl, User, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateUser(id: number, User: IUser): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<void>(url, User, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteUser(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
