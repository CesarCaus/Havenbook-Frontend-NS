import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private apiUrl = 'http://localhost:8080/api/statistics';

  constructor(private http: HttpClient) { }

  getAuthorSalesStatistics(): Observable<{ author: string, quantity: number }[]> {
    return this.http.get<{ author: string, quantity: number }[]>(`${this.apiUrl}/author-sales`);
  }

  getTotalRevenue(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-revenue`);
  }

  getTotalBookCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-book-count`);
  }

  getBestSellingBooks(): Observable<{ title: string, count: number }[]> {
    return this.http.get<{ title: string, count: number }[]>(`${this.apiUrl}/best-selling-books`);
  }

  getNeverSoldBookCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/never-sold-book-count`);
  }

  // Novos métodos com filtro de data
  getAuthorSalesStatisticsByDate(startDate: string, endDate: string): Observable<{ author: string, quantity: number }[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<{ author: string, quantity: number }[]>(`${this.apiUrl}/author-sales-by-date`, { params });
  }

  getTotalRevenueByDate(startDate: string, endDate: string): Observable<number> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<number>(`${this.apiUrl}/total-revenue-by-date`, { params });
  }

  getTotalBookCountByDate(startDate: string, endDate: string): Observable<number> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<number>(`${this.apiUrl}/total-book-count-by-date`, { params });
  }

  getBestSellingBooksByDate(startDate: string, endDate: string): Observable<{ title: string, count: number }[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<{ title: string, count: number }[]>(`${this.apiUrl}/best-selling-books-by-date`, { params });
  }

  getNeverSoldBookCountByDate(startDate: string, endDate: string): Observable<number> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<number>(`${this.apiUrl}/never-sold-book-count-by-date`, { params });
  }
}
