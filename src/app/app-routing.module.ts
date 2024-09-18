import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'appointments',
    loadChildren: () => import('./appointment/appointment.module').then(m => m.AppointmentModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'invoices',
    loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'providers',
    loadChildren: () => import('./provider/provider.module').then(m => m.ProviderModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'works',
    loadChildren: () => import('./work/work.module').then(m => m.WorkModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
