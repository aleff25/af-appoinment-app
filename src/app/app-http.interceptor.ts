import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  private removeToken() {
    sessionStorage.removeItem('PO_USER_LOGIN');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.removeToken();

            // Redirecionar para a página de login quando o status de resposta for 401
            this.router.navigate(['/login']);
          } else if (error.status === 403) {
            this.removeToken();

            // Redirecionar para a página de acesso negado quando o status de resposta for 403
            this.router.navigate(['/login']);
          } else if (error.status === 404) {
            // Redirecionar para a página de não encontrado quando o status de resposta for 404
            this.router.navigate(['/not-found']);
          }
          return throwError(error);
        })
      );
  }
}
