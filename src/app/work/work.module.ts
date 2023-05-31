import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkRoutingModule } from './work-routing.module';
import { WorkComponent } from './work.component';
import { PoBreadcrumbModule, PoButtonModule, PoDynamicModule, PoModalModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { PoPageDynamicDetailModule, PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { WorkNewComponent } from './work-new/work-new.component';



@NgModule({
  declarations: [
    WorkComponent,
    WorkNewComponent
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
    WorkRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class WorkModule { }
