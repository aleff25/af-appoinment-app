import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PoPageModule } from '@po-ui/ng-components';
import { HomeRoutingModule } from './home-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PoPageModule,
    FullCalendarModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
