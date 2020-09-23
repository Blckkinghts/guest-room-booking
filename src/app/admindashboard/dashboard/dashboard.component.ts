import { Component, OnInit, ChangeDetectorRef,AfterViewInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MediaMatcher } from '@angular/cdk/layout';
import { AdminserService } from '../adminser.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {BookingDialog} from './bookingdialog'
import {MatSnackBar} from '@angular/material/snack-bar';
import {RoomDialog} from './roomdialog'
import { Router} from '@angular/router'
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import {UserDialog} from  './userdialog'
//admindasboard....
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit {
  value;serch    
  mobileQuery: MediaQueryList;
  alluser;role;adncity;email;
  private _mobileQueryListener: () => any;
  
  alladmins: any[];
  constructor(private snacke:MatSnackBar,private dialog: MatDialog,private route:Router,
    private firedb:AngularFirestore,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private adminser:AdminserService,private auth:AngularFireAuth) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  fabButtons = [
    {
      icon: 'book',tooltip:"New Booking",fun:()=>{this.openbookDialog();}
    },
    {
      icon: 'room',tooltip:"New Rooms",fun:()=>{this.openroomDialog()}
    },
    {
      icon: 'group_add',tooltip:"New User",fun:()=>{this.openuserdialog()}
    },
    {
      icon: 'payments',tooltip:"Payments",fun:()=>{}
    }
  ]; 
  col="primary"
  buttons = [];
  fabTogglerState = 'inactive';
  openbookDialog(): void {
    const dialogRef = this.dialog.open(BookingDialog, {
      width: '500px',
      data: {city:this.adncity,localtites:this.adminser.curcity_loc,custmail:this.adminser.custmail}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        // console.log("canbk : ",this.adminser.checkforbook(result));
        if (this.adminser.checkforbook(result)){
          if (result.userst==0 && !(this.adminser.checkuser(result))){
            console.log(result)               //newuser
            this.adminser.newuserbk(result);
            this.snacke.open("New User Added ",'Ok',{duration:1000});
            this.snacke.open("Successfully Booked",'Ok',{duration:1000});
          }
          else if(result.userst==1 && this.adminser.checkuser(result)==true){  //olduser
            console.log("Old user..!",result);
            this.adminser.olduserbk(result);
            this.snacke.open("Successfully Booked",'Ok',{duration:1000});
          }
          else{
            console.log("ERROR...!");
            this.snacke.open("Error..! Wrong Information",'Ok',{duration:2000});
          }
        }
        else{
          this.snacke.open("Not Available..!",'Ok',{duration:2000});
          console.log("NOPE....!");
        }
      }
      else{
        console.log('No action');
        this.snacke.open("Canceled",'',{duration:1000});
      }
      
    });
  }
  openroomDialog(): void {
    const dialogRef = this.dialog.open(RoomDialog, {
      width: '400px',height:'600px',
      data: {city:this.adncity,localtites:this.adminser.curcity_loc}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result){
        if(this.adminser.checkloca(result)){
          this.adminser.newroom(result);
          this.snacke.open("New Room Added Successfully",'Ok',{duration:2000});
        }
        else{
          console.log("NOPE..!");
          this.snacke.open("Failure..",'Ok',{duration:2000});
        }
      }
      else{
        console.log('No action');
        this.snacke.open("Canceled",'',{duration:1000});
      }
      
    });
  }
  openuserdialog() {
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
  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }
  localtites:any[];
  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }
  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }
  ngOnInit(): void {
    this.adminser.usersD.valueChanges().subscribe( i => {
      this.alluser = i;
      this.auth.authState.pipe(
        tap(user => {
          if (user) {
            this.role = this.alluser.find(i => i.uid == user.uid).role;
            this.email=user.email;
            // console.log(this.role);
            // console.log(this.email);
            if (this.role=='admin'){
              console.log('Welcome');
              this.adminser.adminD.doc(this.email).valueChanges().subscribe(i=>{
                this.adncity=i.city;
                console.log(this.adncity);
              });
            }
            else{
              this.logout();
              alert("Unauthorized Access...!");
            }
          }
          else{
            this.role="";
            this.route.navigateByUrl("");
          }
        })
      ).subscribe();
    }); 
    
  }
  ngAfterViewInit(): void {
    
  }
  logout(){
    this.auth.signOut().then(()=>{
      this.route.navigateByUrl('');
    });
  }
}
