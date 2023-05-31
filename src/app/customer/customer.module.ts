import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { PoPageModule, PoTableModule } from '@po-ui/ng-components';



@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    PoTableModule,
    PoPageModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
