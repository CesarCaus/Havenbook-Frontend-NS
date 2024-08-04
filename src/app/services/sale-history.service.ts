// sale-history.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISaleHistory } from '../interfaces/isale-history';

@Injectable({
  providedIn: 'root'
})
export class SaleHistoryService {
  private apiUrl = 'http://localhost:8080/api/salehistory';

  constructor(private http: HttpClient) { }

  getSaleHistories(): Observable<ISaleHistory[]> {
    return this.http.get<ISaleHistory[]>(this.apiUrl);
  }

  getSaleHistoryById(id: number): Observable<ISaleHistory> {
    return this.http.get<ISaleHistory>(`${this.apiUrl}/${id}`);
  }

  createSaleHistory(saleHistory: ISaleHistory): Observable<ISaleHistory> {
    return this.http.post<ISaleHistory>(this.apiUrl, saleHistory);
  }

  updateSaleHistory(saleHistory: ISaleHistory): Observable<ISaleHistory> {
    return this.http.put<ISaleHistory>(`${this.apiUrl}/${saleHistory.id}`, saleHistory);
  }

  deleteSaleHistory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
