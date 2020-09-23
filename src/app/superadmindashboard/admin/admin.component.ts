import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild, Input, Inject, ChangeDetectorRef } from '@angular/core';
import {AdminDialog} from '../dashboard/admindialog'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SpradminserService } from '../spradminser.service';
import {EditDialog} from './editdialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { duration } from 'moment';
import { MediaMatcher } from '@angular/cdk/layout';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @Input() search: string;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => any;
  constructor(private snacke:MatSnackBar,private sprser:SpradminserService,
    public dialog: MatDialog,public httpClient: HttpClient,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    }
  displayedColumns = ['name', 'email', 'phone', 'City', 'bank_acc_no', 'actions'];
  dataSource=[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;
  ngOnInit() {
    this.sprser.adminD.valueChanges().subscribe(i=>{
      console.log("Admins : ",i);
      this.dataSource=i;
    });
    this.dataSource=this.sprser.alladmins;
  }
  addNew() {
    const dialogRef = this.dialog.open(AdminDialog, {
      data: {city:this.sprser.cities},width:'400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(this.sprser.checkadmn(result) && this.sprser.checkcity(result)){
          console.log("YUP..!");
          this.sprser.newadmintodb(result);
          this.sprser.newadmininvite(result);
          this.snacke.open("Successfull ","",{duration:1000})
        }
        else{
          console.log("NOPE..!");
          this.snacke.open("Error in Adding Admin..!","OK",{duration:5000});
        }
        console.log('The dialog was closed');
      }
      else{
        console.log("No ACtion");
        this.snacke.open("Canceled","",{duration:1000});
      }
    });
  }
  startEdit( name, phone, city, email: string, bank_acc_no: string,gen:string) {

    const dialogRef = this.dialog.open(EditDialog, {
      data: {cityl:this.sprser.cities ,
        name: name, phone: phone, city: city, 
        email: email, bank_acc_no: bank_acc_no,gen:gen
      },width:'400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.sprser.editadmin(result);
        this.snacke.open("Updated ","",{duration:1000})
      }
      else{
        console.log("NO Action");
        this.snacke.open("Canceled ","",{duration:1000})
      }
    });
  }
  deleteItem(name: number, phone: string, city: string, email: string,bankacct,gen) {
    var data= {name: name, phone: phone, city: city, email: email,bankaccountno:bankacct,gender:gen}
    const dialogRef = this.dialog.open(ConfirmationDialog, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(data);;
        this.sprser.removeadmin(data);
        this.snacke.open("Successfully Removed","",{duration:1000})
      }
    });
  }
}
@Component({
  selector: 'dialog-elements-example-dialog',
  template: "<h1 mat-dialog-title>Confirmation</h1><div mat-dialog-content>The Admin wil be Unauthorized</div><div mat-dialog-actions><button mat-stroked-button color='warn' (click)='remove()'>Remove the Admin</button><button mat-stroked-button mat-dialog-close>Cancel</button></div>"
})
export class ConfirmationDialog {
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,private dialog: MatDialogRef<ConfirmationDialog>){}
  remove(){
    this.dialog.close(true);
  }
}


