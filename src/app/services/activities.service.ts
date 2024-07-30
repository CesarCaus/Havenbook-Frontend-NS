import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IActivity } from '../interfaces/IActivity.interface';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  private activitiesUrl = 'http://localhost:8080/api/activities';

  constructor(private http: HttpClient) { }

  getActivities(): Observable<IActivity[]> {
    return this.http.get<IActivity[]>(this.activitiesUrl).pipe(
      map(response => Array.isArray(response) ? response : []),
      catchError(error => {
        console.error('Erro ao obter atividades', error);
        return of([]);
      })
    );
  }

  setActivity(activity: IActivity): Observable<IActivity> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<IActivity>(this.activitiesUrl, activity, httpOptions).pipe(
      catchError(error => {
        console.error('Erro ao adicionar atividade', error);
        return of(activity);
      })
    );
  }

  updateActivity(activity: IActivity): Observable<void> {

    return this.http.put<void>(`${this.activitiesUrl}/${activity.id}`, activity).pipe(
      catchError(error => {
        console.error('Erro ao atualizar atividade', error);
        return of();
      })
    );
  }

  deleteActivity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.activitiesUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Erro ao deletar atividade', error);
        return of();
      })
    );
  }
}
