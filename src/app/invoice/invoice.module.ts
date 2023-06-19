import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { PoBreadcrumbModule, PoButtonModule, PoDynamicModule, PoModalModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { PoPageDynamicDetailModule, PoPageDynamicTableModule } from '@po-ui/ng-templates';



@NgModule({
  declarations: [InvoiceComponent],
  imports: [
    CommonModule,
    PoTableModule,
    PoButtonModule,
    PoBreadcrumbModule,
    PoModalModule,
    PoDynamicModule,
    PoPageModule,
    PoPageDynamicTableModule,
    PoPageDynamicDetailModule,
    InvoiceRoutingModule
  ]
})
export class InvoiceModule { }
