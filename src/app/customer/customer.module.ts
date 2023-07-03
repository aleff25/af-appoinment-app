import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { PoBreadcrumbModule, PoDynamicModule, PoModalModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';



@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    PoBreadcrumbModule,
    PoModalModule,
    PoDynamicModule,
    PoPageModule,
    PoPageDynamicTableModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
