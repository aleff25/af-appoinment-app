import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomerList } from '../../core/entities/customer/customer.interface';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../shared/utils/api-response';

@Injectable()
export class CustomersListService {

  private RESOURCE_URL = 'http://localhost:9094';

  constructor(private http: HttpClient) {}

  list(): Observable<ApiResponse<ICustomerList>> {
    return this.http.get<ApiResponse<ICustomerList>>(`${this.RESOURCE_URL}/users/customers`);
  }
}
