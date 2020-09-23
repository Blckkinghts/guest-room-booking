import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxAuthFirebaseUIModule, 
  NgxAuthFirebaseUIConfig, UserProvidedConfigToken, 
  NgxAuthFirebaseUIConfigToken, 
  ngxAuthFirebaseUIConfigFactory, 
  AuthProcessService, FirestoreSyncService, 
  LoggedInGuard } from 'ngx-auth-firebaseui';
import { FlexLayoutModule } from "@angular/flex-layout";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ChartsModule } from 'ng2-charts';
import { SuperadmindashboardRoutingModule } from './superadmindashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';
import { AdminComponent } from './admin/admin.component';
import { CityComponent } from './city/city.component';
import { SpradminserService } from './spradminser.service';
import {AdminDialog} from './dashboard/admindialog';
import { UsersComponent } from './users/users.component';
import {EditDialog} from './admin/editdialog';
import  {ConfirmationDialog}from './admin/admin.component'
import {CityDialog} from './dashboard/citydialog'
import { ReviewComponent } from './review/review.component'
@NgModule({
  declarations: [DashboardComponent,AdminDialog,EditDialog,CityDialog,ConfirmationDialog, AdminComponent, CityComponent, UsersComponent, ReviewComponent],
  imports: [ 
    CommonModule,ReactiveFormsModule,FormsModule,MaterialModule,
    SuperadmindashboardRoutingModule,ChartsModule,
    Ng2SearchPipeModule,NgxAuthFirebaseUIModule,FlexLayoutModule
  ],
  providers:[SpradminserService]
})
export class SuperadmindashboardModule { }
