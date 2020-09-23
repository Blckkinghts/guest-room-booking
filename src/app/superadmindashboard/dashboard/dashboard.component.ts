import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MediaMatcher } from '@angular/cdk/layout';
import { AngularFireAuth } from '@angular/fire/auth';
import { SpradminserService } from '../spradminser.service';
import { Router} from '@angular/router'
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import {AdminDialog} from './admindialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {CityDialog} from './citydialog'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  value;serch    
  mobileQuery: MediaQueryList;
  alluser;
  role;
  discmp="admin";
  cdis(cmp){
    this.discmp=cmp;
    this.serch="";
  }
  private _mobileQueryListener: () => any;
  constructor(private snacke:MatSnackBar,private dialog: MatDialog,private route:Router,private firedb:AngularFirestore,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private auth:AngularFireAuth,private sprser:SpradminserService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  fabButtons = [
    {
      icon: 'group_add',tooltip:"New Admins",fun:()=>{this.openadminDialog();}
    },
    {
      icon: 'location_city',tooltip:"New Cities",fun:()=>{this.opencitydialog();}
    },
    {
      icon: 'payments',tooltip:"Payments",fun:()=>{this.openadminDialog();}
    }
  ];
  buttons = [];
  fabTogglerState = 'inactive';
  openadminDialog(): void {
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
          this.snacke.open("Error in Adding Admin..!","OK",{duration:5000});
          console.log("NOPE..!");
        }
        console.log('The dialog was closed');
      }
      else{
        console.log("No ACtion");
        this.snacke.open("Canceled","",{duration:1000});
      }
    });
  }
  opencitydialog():void{
    const dialogRef = this.dialog.open(CityDialog, {
      data: {},width:'400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(this.sprser.checkEcity(result)){
          this.sprser.newcity(result);
          this.snacke.open("New City Added","",{duration:1000});
        }
        else{
          console.log("Already exist..!");
          this.snacke.open("Already exist..!","",{duration:1000});
        }
      }
      else{
        console.log("No ACtion");
        this.snacke.open("Canceled","",{duration:1000});
      }
    });
  }
  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }
  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }
  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }
  ngOnInit(): void {
    var data=this.firedb.collection('users').valueChanges();
    data.subscribe( i => {
      this.alluser = i;
      this.auth.authState.pipe(
        tap(user => {
          if (user) {
            this.role = this.alluser.find(i => i.uid == user.uid).role;
            console.log(this.role);
            if (this.role=='superadmin'){
              console.log('Welcome');
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
  logout(){
    this.auth.signOut().then(()=>{
      this.route.navigateByUrl('');
    });
  }
}
