import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderRoutingModule } from './provider-routing.module';
import { ProviderComponent } from './provider.component';
import { PoBreadcrumbModule, PoDynamicModule, PoModalModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';



@NgModule({
  declarations: [ProviderComponent],
  imports: [
    CommonModule,
    PoBreadcrumbModule,
    PoModalModule,
    PoDynamicModule,
    PoPageModule,
    PoPageDynamicTableModule,
    ProviderRoutingModule
  ]
})
export class ProviderModule { }
