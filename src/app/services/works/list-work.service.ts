import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWorkList } from '../../core/entities/work/work.interface';

@Injectable()
export class ListWorkService {

  private RESOURCE_URL = 'http://localhost:9094';

  constructor(private http: HttpClient) {}

  list(): Observable<IWorkList> {
    return this.http.get<IWorkList>(`${this.RESOURCE_URL}/appointments`);
  }

}
