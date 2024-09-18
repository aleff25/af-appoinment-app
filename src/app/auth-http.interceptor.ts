import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import { LoginService } from './services/login/login.service';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private keycloakService: KeycloakService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Defina URLs que você deseja excluir da autenticação
    const excludedUrls = ['assets/', 'public-api/', '/login'];

    if (excludedUrls.some((url) => request.url.includes(url))) {
      return next.handle(request);
    }

    if (this.keycloakService.isLoggedIn()) {
      return from(this.keycloakService.getToken()).pipe(
        switchMap((token) => {

          if (!token) {
            return throwError(new Error('Token is null or undefined'));
          }

          const cloned = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          return next.handle(cloned);
        })
      );
    } else {
      // Se o usuário não estiver logado, você pode optar por redirecioná-lo ou permitir a requisição sem o token
      return next.handle(request);
    };
  }
}
