import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentComponent } from './appointment.component';
import { AppointmentRoutingModule } from './appointment-routing.module';
import { PoBreadcrumbModule, PoButtonModule, PoDynamicModule, PoModalModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { PoPageDynamicDetailModule, PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { AppointmentNewComponent } from './appointment-new/appointment-new.component';



@NgModule({
  declarations: [
    AppointmentComponent,
    AppointmentNewComponent,
  ],
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
    AppointmentRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppointmentModule { }
