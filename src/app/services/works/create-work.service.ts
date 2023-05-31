import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CreateWorkService {

  private RESOURCE_URL = 'http://localhost:9094';

  constructor(private http: HttpClient) {}

  create(body: any): Observable<void> {
    return this.http.post<void>(`${this.RESOURCE_URL}/works`, body)
  }
}
