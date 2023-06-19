import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProviderist } from '../../core/entities/provider/provider.interface';

@Injectable()
export class ListProviderService {

  private RESOURCE_URL = 'http://localhost:9094';

  constructor(private http: HttpClient) {}

  list(): Observable<Array<IProviderist>> {
    return this.http.get<Array<IProviderist>>(`${this.RESOURCE_URL}/users/providers`);
  }
}
