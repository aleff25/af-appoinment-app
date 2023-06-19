import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private RESOURCE_URL = 'http://localhost:9094';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const credentials = {
      username: username,
      password: password
    };

    // Faça a solicitação HTTP para obter o token de autenticação
    return this.http.post<any>(`${this.RESOURCE_URL}/login`, credentials);
  }

  saveToken(token: string): void {
    sessionStorage.setItem('PO_USER_LOGIN', token);
  }

  getToken(): string | null {
    const token = sessionStorage.getItem('PO_USER_LOGIN') || '';
    return token ? JSON.parse(token).token : null;
  }
}
