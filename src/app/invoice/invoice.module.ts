import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { PoPageModule, PoTableModule } from '@po-ui/ng-components';



@NgModule({
  declarations: [InvoiceComponent],
  imports: [
    CommonModule,
    PoTableModule,
    PoPageModule,
    InvoiceRoutingModule
  ]
})
export class InvoiceModule { }
