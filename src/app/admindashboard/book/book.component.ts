import { Component, OnInit, Input, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MediaMatcher } from '@angular/cdk/layout';
import { BookingDialog } from '../dashboard/bookingdialog'
import { AdminserService } from '../adminser.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { extendMoment } from 'moment-range';
import {room} from '../adminser.service'
const mnt = extendMoment(moment);

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input() search: string;
  @ViewChild('calendar') calendar;
  role: string;
  cal:number=0;
  adncity:string;
  viewD:string;
  mobileQuery: MediaQueryList;
  cd:number=0;
  serch:string  
  all:room[];
  avaiable=[];
  booked=[];
  private _mobileQueryListener: () => any;
  constructor(private ref: ChangeDetectorRef,private snacke:MatSnackBar,private dialog: MatDialog,private firedb:AngularFirestore,private changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private adminser:AdminserService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener)  }
  
  book(status){
    if(status=='available'){
      this.openbookDialog();
    }
    else{
      console.log("ERROR///!");
    }
  }
  onSelect(eve){
    this.openbookDialog();
  }
  openbookDialog(): void {
    const dialogRef = this.dialog.open(BookingDialog, {
      width: '500px',
      data: {city:this.adncity,localtites:this.adminser.curcity_loc,custmail:this.adminser.custmail}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
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
            
            this.snacke.open("Error..! Wrong Information",'Ok',{duration:2000});
          }
        }
        else{
          this.snacke.open("Not Available..!",'Ok',{duration:2000});
         
        }
      }
      else{
        console.log('No action');
        this.snacke.open("Canceled",'',{duration:1000});
      }
    });
  }
  disbledates=[];
  forfil=[];
  calefil(data){
    this.viewD="year";
    this.cd=0;
    setTimeout(() => {
      this.cd=1;
    },0);
    var boked_his:any[]=data.booked_his;
    this.disbledates=[];
    if(boked_his.length>0){
      boked_his.map(i=>{
        var start=new Date(i.startdate.toDate());
        var end=new Date(i.enddate.toDate());
        var range=mnt.range(start,end);
        const arrayOfDates = Array.from(range.by('day'))
        arrayOfDates.map((i:any)=>{
          this.disbledates.push(new Date(i.toString()));
        });
      });
    }
    else{
      this.snacke.open("No Booked Rooms are Found...!",'',{duration:1000});
    }
  }
  filterdates=(d:Date)=>{
    this.forfil=[];
    this.forfil=this.disbledates;
    var day=d.getDay();
    var time=d.getTime();
    var date=d.getDate();
    return !this.forfil.find(i=>i.getTime()==time);
  }
  ngOnInit(): void {
    this.adminser.roomD.valueChanges().subscribe((i:any)=>{
      this.adncity=this.adminser.adncity;
      console.log("Rooms : ",i);
      this.all=i.filter(l=>{
        if(l.city==this.adncity){
          return(l);
        }
      });
      console.log(this.all);
      this.avaiable=this.all.filter(i=>{
        if (i.status=="available"){
          return i;
        }
      });
      this.booked=this.all.filter(i=>{
        if (i.status=="booked"){
          return i;
        }
      });
    })
    
    
  } 
}