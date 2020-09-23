import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, Input, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion}  from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { AdminserService } from '../adminser.service';
import { UserDialog } from '../dashboard/userdialog';
import { EditDialog } from './editdialog';
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
  constructor(private snacke:MatSnackBar,private dialog:MatDialog,
    private adminser:AdminserService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
     }
  ngOnInit(): void {
    this.dataSource=this.adminser.allcust;
    console.log(this.dataSource);
  }
  displayedColumns = ['photourl', 'email','name', 'phone', 'City', 'address', 'actions'];
  dataSource=[];
  index: number;
  name: number;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  addNew() {
    const dialogRef = this.dialog.open(UserDialog, {
      width: '400px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(!this.adminser.checkuser(result)){
          this.adminser.newuserdb(result);
          this.adminser.newuser(result);
        }
        else{
          this.snacke.open("Error ...! User already Exist ",'Ok',{duration:3000});
        }
        console.log(result);
      }
      else{
        console.log('No action');
        this.snacke.open("Canceled",'',{duration:1000});
      }
    });
  }
  startEdit( name: string, phone: string, location: string, email: string, Address:string) {

    const dialogRef = this.dialog.open(EditDialog, {
      data: {name:name,city:location,email:email,phone:phone,addrs:Address},width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.adminser.edituser(result);
      }
    });
  }
  deleteItem(i: number, name: number, phone: string, City: string, email: string) {
    this.index = i;
    this.name = name;
    const dialogRef = this.dialog.open(UserDialog, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        
      }
    });
  }
}

