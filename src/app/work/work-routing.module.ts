import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkComponent } from './work.component';
import { WorkNewComponent } from './work-new/work-new.component';

const routes: Routes = [
  {
    path: '',
    component: WorkComponent,
    pathMatch: 'full'
  },
  {
    path: 'new',
    component: WorkNewComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkRoutingModule { }
