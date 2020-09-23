import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SigninComponent} from './signin/signin.component'
import { RegisterComponent } from './register/register.component';
import { AdminverifyComponent } from './adminverify/adminverify.component';
import {UserverifyComponent} from './userverify/userverify.component'
const routes: Routes = [{
  path:'',
  component:SigninComponent
},
{
  path:'userverify',
  component:UserverifyComponent
},
{
  path:'register',
  component:RegisterComponent
},
{
  path:'adminverify',
  component:AdminverifyComponent
},
{
  path:"user",
  loadChildren:()=> import(`./userdashboard/userdashboard.module`).then(m=>m.UserdashboardModule)
},
{
  path:"admin",
  loadChildren:()=> import(`./admindashboard/admindashboard.module`).then(m=>m.AdmindashboardModule)
},
{
  path:"superadmin",
  loadChildren:()=> import(`./superadmindashboard/superadmindashboard.module`).then(m=>m.SuperadmindashboardModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
