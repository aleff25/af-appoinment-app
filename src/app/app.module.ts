import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoI18nModule, PoModule } from '@po-ui/ng-components';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { AppHttpInterceptor } from './app-http.interceptor';
import { AuthInterceptor } from './auth-http.interceptor';
import { PoI18nConfig } from '@po-ui/ng-components';

import { generalEn } from '../assets/i18n/translate-en';
import { generalPt } from '../assets/i18n/translate-pt-br';
import { initializeKeycloak } from './init/keycloak-init.factory';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

const i18nConfig: PoI18nConfig = {
  contexts: {
    general: {
      'pt-BR': generalPt, // constantes em arquivos separados
      'en-US': generalEn // constantes em arquivos separados
    },
  },
  default: {
    language: 'pt-BR',
    context: 'general',
    cache: true
  }
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PoModule,
    HttpClientModule,
    PoTemplatesModule,
    PoI18nModule.config(i18nConfig),
    AppRoutingModule,
    KeycloakAngularModule,
  ],
  providers: [
    KeycloakService,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
