import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewCustomer } from '../models/viewcustomer';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'https://localhost:7253/api/Customer';
  constructor(private http: HttpClient) {}

  getAll(): Observable<ViewCustomer[]> {
    return this.http.get<ViewCustomer[]>(this.apiUrl);
  }

  getById(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  create(customer: Customer): Observable<void> {
    return this.http.post<void>(this.apiUrl, customer);
  }

  update(customer: Customer): Observable<void> {
    return this.http.put<void>(this.apiUrl, customer);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
