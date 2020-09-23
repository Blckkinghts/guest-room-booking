import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookComponent } from './book/book.component';
import { ReviewComponent } from './review/review.component';
import { UsersComponent } from './users/users.component';
const routes: Routes = [
  {
    path:"",
    component:DashboardComponent,
    children:[
      {
        path:'',
        redirectTo:'booking'
      },
      {
        path:'booking',
        component:BookComponent
      },
      {
        path:'Mangeuser',
        component:UsersComponent
      },
      {
        path:'report',
        component:ReviewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmindashboardRoutingModule { }
