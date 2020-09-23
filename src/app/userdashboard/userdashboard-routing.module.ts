import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AdminComponent } from './admin/admin.component'
import { HistoryComponent } from './history/history.component';
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [
  {
    path:"",
    component:DashboardComponent,
    children:[
      {
        path:'',
        redirectTo:'contactadmin'
      },
      {
        path:'contactadmin',
        component:AdminComponent
      },
      {
        path:'History',
        component:HistoryComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]   
})
export class UserdashboardRoutingModule { }
