import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAppointmentList } from '../../core/entities/appointmet/appointmet.interface';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/utils/api-response';

@Injectable()
export class AppointmentListService {

  private RESOURCE_URL = 'http://localhost:9094';

  constructor(private http: HttpClient) {}

  list(startDate: string, endDate: string): Observable<ApiResponse<IAppointmentList>> {
    return this.http.get<ApiResponse<IAppointmentList>>(`${this.RESOURCE_URL}/appointments?startDate=${startDate}&endDate=${endDate}`);
  }
}
