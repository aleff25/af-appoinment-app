import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PoDynamicModule, PoMenuModule, PoModalModule, PoPageModule, PoToolbarModule } from '@po-ui/ng-components';
import { HomeRoutingModule } from './home-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PoPageDynamicDetailModule, PoPageDynamicTableModule } from '@po-ui/ng-templates';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PoModalModule,
    PoDynamicModule,
    PoPageModule,
    PoMenuModule,
    PoToolbarModule,
    FullCalendarModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
