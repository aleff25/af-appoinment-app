import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment.component';
import { AppointmentNewComponent } from './appointment-new/appointment-new.component';

const routes: Routes = [
  {
    path: '',
    component: AppointmentComponent,
    pathMatch: 'full',
  },
  {
    path: 'new',
    component: AppointmentNewComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
