import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { PoTableModule } from '@po-ui/ng-components';
import { PoPageBlockedUserModule, PoPageLoginModule } from '@po-ui/ng-templates';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    PoTableModule,
    PoPageLoginModule,
    PoPageBlockedUserModule,
    LoginRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class LoginModule { }
