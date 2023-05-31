import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderRoutingModule } from './provider-routing.module';
import { ProviderComponent } from './provider.component';
import { PoPageModule, PoTableModule } from '@po-ui/ng-components';



@NgModule({
  declarations: [ProviderComponent],
  imports: [
    CommonModule,
    PoTableModule,
    PoPageModule,
    ProviderRoutingModule
  ]
})
export class ProviderModule { }
