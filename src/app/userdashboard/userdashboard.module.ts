import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxAuthFirebaseUIModule, 
  NgxAuthFirebaseUIConfig, UserProvidedConfigToken, 
  NgxAuthFirebaseUIConfigToken, 
  ngxAuthFirebaseUIConfigFactory, 
  AuthProcessService, FirestoreSyncService, 
  LoggedInGuard } from 'ngx-auth-firebaseui';
import { FlexLayoutModule } from "@angular/flex-layout";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
  
import { UserdashboardRoutingModule } from './userdashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';
import { AdminComponent } from './admin/admin.component'
import { UserserService } from './userser.service';
import { HistoryComponent } from './history/history.component';
import { ProfileComponent } from './profile/profile.component';
@NgModule({
  declarations: [DashboardComponent, AdminComponent, HistoryComponent, ProfileComponent],
  imports: [
    CommonModule,MaterialModule,ReactiveFormsModule,FormsModule,Ng2SearchPipeModule,
    UserdashboardRoutingModule,NgxAuthFirebaseUIModule,FlexLayoutModule
  ],
  providers:[UserserService]
})
export class UserdashboardModule { }
