import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxAuthFirebaseUIModule, 
  NgxAuthFirebaseUIConfig, UserProvidedConfigToken, 
  NgxAuthFirebaseUIConfigToken, 
  ngxAuthFirebaseUIConfigFactory, 
  AuthProcessService, FirestoreSyncService, 
  LoggedInGuard } from 'ngx-auth-firebaseui';
  
import { ChartsModule } from 'ng2-charts';
import { AdmindashboardRoutingModule } from './admindashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';

import { AdminserService } from './adminser.service';
import {EditDialog} from './users/editdialog'
import {BookingDialog} from './dashboard/bookingdialog';import {RoomDialog} from './dashboard/roomdialog'
import { BookComponent } from './book/book.component'
import { ReviewComponent } from './review/review.component';
import { UsersComponent } from './users/users.component';
import { PaymentComponent } from './payment/payment.component';
import {UserDialog} from './dashboard/userdialog'
@NgModule({
  declarations: [DashboardComponent,EditDialog, UserDialog,BookComponent,BookingDialog,RoomDialog, ReviewComponent, UsersComponent, PaymentComponent],
  imports: [
    CommonModule,MaterialModule,ReactiveFormsModule,FormsModule,ChartsModule,
    AdmindashboardRoutingModule,
    Ng2SearchPipeModule,FlexLayoutModule
    ,NgxAuthFirebaseUIModule
  ],
  providers:[AdminserService],
  schemas:[NO_ERRORS_SCHEMA]
})
export class AdmindashboardModule { }
