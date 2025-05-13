import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private baseUrl = 'http://localhost:8081/api/statistics';

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/dashboard`);
  }

  getMonthlyStatistics(year: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/monthly/${year}`);
  }

  getCityDistribution(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cities`);
  }

  getTopProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/top-products`);
  }
} 