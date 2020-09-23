import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { ReviewComponent } from './review/review.component'
import { CityComponent } from './city/city.component';
const routes: Routes = [
  {
    path:"",
    component:DashboardComponent,
    children:[
      {
        path:'',
        redirectTo:'admindetails'
      },
      {
        path:'admindetails',
        component:AdminComponent
      },
      {
        path:'userinfo',
        component:UsersComponent
      },
      {
        path:'reivew',
        component:ReviewComponent
      },
      {
        path:'cities',
        component:CityComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadmindashboardRoutingModule { }
