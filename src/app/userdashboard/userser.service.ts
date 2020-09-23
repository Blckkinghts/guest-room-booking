import { Injectable } from '@angular/core';
import { FirebserService } from '../firebser.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { tap, concatAll } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
interface cust{
  name:string,email:string,history:any[],currently_booked:any[],location:string,phone:string,photoURL:string,Address:string
}
@Injectable({
  providedIn: 'root'
})
export class UserserService {
  usersD;adminD;custD;bookD
  alluser: any[];allcust: any[];
  alladmins: any[];bookedrooms:any[];
  email: any;role;
  myhis=[]
  serch;
  mybkg=[]
  mydet:any=[];
  constructor(private auth:AngularFireAuth,private firebser:FirebserService,private firedb:AngularFirestore) { 
    this.adminD=this.firedb.collection('admins');
    this.bookD=this.firedb.collection('bookedrooms');
    this.usersD=this.firedb.collection('users');
    this.custD=this.firedb.collection('customer');
    this.usersD.valueChanges().subscribe( i => {
      this.alluser = i;
      this.auth.authState.pipe(
        tap(user => {
          if (user) {
            this.role = this.alluser.find(i => i.uid == user.uid).role;
            this.email=this.alluser.find(i => i.uid == user.uid).email;
            this.adminD.valueChanges().subscribe(i=>{
              console.log("Admins : ",i);
              this.alladmins=i;
            });
            this.bookD.valueChanges().subscribe(i=>{
              this.bookedrooms=i; //MAIN BLOCK TO UPDATE ALL
              console.log("Booked Rooms : ",this.bookedrooms);
            });
            this.custD.valueChanges().subscribe(i=>{
              console.log("Customers : ",i);
              this.allcust=i;
            });
            this.firedb.collection('customer').doc(this.email).valueChanges().subscribe((i:cust)=>{
              this.mydet=i;
              this.myhis=i.history;
              this.mybkg=i.currently_booked;
              console.log("MY BOOKED D:  ",this.myhis);
              console.log("CURRENTLY  : ",this.mybkg);
            })
          }
        })
      ).subscribe();
    });
  }
}
