import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { PoTableModule } from '@po-ui/ng-components';
import { PoPageLoginModule } from '@po-ui/ng-templates';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    PoTableModule,
    PoPageLoginModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
