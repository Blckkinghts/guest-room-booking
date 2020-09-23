import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, Input, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatAccordion} from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { SpradminserService } from '../spradminser.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @Input() search: string;
  panelOpenState = false;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => any;
  constructor(private sprser:SpradminserService,private snacke:MatSnackBar,
    private dialog:MatDialog,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.dataSource=this.sprser.allcust;
    console.log(this.dataSource);
  }
  displayedColumns = ['photourl', 'email','name', 'phone', 'City', 'address'];
  dataSource=[];
  index: number;
  name: number;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;
  addNew() {
    // const dialogRef = this.dialog.open(UserDialog, {
    //   width: '400px',
    //   data: {}
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if(result){
    //     if(!this.sprser.checkuser(result)){
    //       this.sprser.newuserdb(result);
    //       this.sprser.newuser(result);
    //     }
    //     else{
    //       this.snacke.open("Error ...! User already Exist ",'Ok',{duration:3000});
    //     }
    //     console.log(result);
    //   }
    //   else{
    //     console.log('No action');
    //     this.snacke.open("Canceled",'',{duration:1000});
    //   }
    // });
  }
  startEdit(i: number, name: number, phone: string, City: string, email: string, joining_date: string, bank_acc_no: string) {
    // this.name = name;
    // this.index = i;
    // console.log(this.index);
    // const dialogRef = this.dialog.open(UserDialog, {
    //   data: {}
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === 1) {
        
    //   }
    // });
  }
  deleteItem(i: number, name: number, phone: string, City: string, email: string) {
    // this.index = i;
    // this.name = name;
    // const dialogRef = this.dialog.open(UserDialog, {
    //   data: {}
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === 1) {
        
    //   }
    // });
  }

}
