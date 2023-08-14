import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './services/login/login.service';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService,
    private keycloakService: KeycloakService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const isLoginPage = request.url.includes('/login'); // Verificar se é a página de login
    // if (isLoginPage) {
    //   // Pular adição de cabeçalho de autorização
    //   return next.handle(request);
    // }

    // const token = this.loginService.getToken(); // Substitua pelo token real

    // // Clonar a solicitação e adicionar o cabeçalho de autorização
    // const authRequest = request.clone({
    //   setHeaders: {
    //     Authorization: `Bearer ${token}`
    //   }
    // });

    // Prosseguir com a solicitação clonada
    return next.handle(request);
  }
}
