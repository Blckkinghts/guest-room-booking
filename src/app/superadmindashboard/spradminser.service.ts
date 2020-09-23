import { Injectable } from '@angular/core';
import { FirebserService } from '../firebser.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { tap, concatAll } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import {bookedrooms, city, user ,cust,admin,room}from '../interface'
@Injectable({
  providedIn: 'root'
})
export class SpradminserService {
  emisnd: boolean;
  usersD:any;adminD:any;custD:any;bookD:any;cityD:any;roomD:any;
  alluser: user[];
  role: string;
  email: string;
  alladmins: admin[];
  allrooms: room[];
  allcities: city[];
  allcust: cust[];
  cities=[];reportdata: any[]=[]; bookedrooms:bookedrooms[];
  constructor(private auth:AngularFireAuth,
    private firebser:FirebserService,private firedb:AngularFirestore) {
      this.usersD=this.firedb.collection('users');
      this.adminD=this.firedb.collection('admins');
      this.custD=this.firedb.collection('customer');
      this.cityD=this.firedb.collection('cities');
      this.roomD=this.firedb.collection('rooms');
      this.bookD=this.firedb.collection('bookedrooms');
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
              this.cities=[];
              this.cityD.valueChanges().subscribe(i=>{
                console.log("cities : ",i);
                this.allcities=i;
                this.allcities.map(c=>{
                this.cities.push({cityname:c.cityname,tot:c.tot_no_rooms});
              })
              console.log("Cities naames : ",this.cities);
              console.log("Cities",this.allcities);
              this.reportdata=[];
              this.allcities.map(i=>{
                var roomcnt=[];
                var locts:any[]=i.localities.map(l=>{return l.loc_name})
                var nicks=[]
                var data= [];
                this.bookedrooms.map(j=>{
                  locts.map(i=>{
                    if (j.locality==i){
                      var locnam:string=j.locality
                      roomcnt.push({loc:j.locality,
                        bookedcnt:j.daterange.length,
                        nick:(locnam.charAt(0)+locnam.charAt(locnam.length/2)+locnam.charAt(locnam.length-1)).toUpperCase()}
                      );
                      nicks.push((locnam.charAt(0)+locnam.charAt(locnam.length/2)+locnam.charAt(locnam.length-1)).toUpperCase())
                      data.push(j.daterange.length);
                    }
                  })
                })
                var repD={
                  nick:i.nick,  
                  cityname:i.cityname,
                  roomD:roomcnt,
                  nickn:nicks,
                  data:[{data:data,label: 'No. of rooms booked in '+i.cityname.toUpperCase()}],
                  tot_no_rooms:i.tot_no_rooms
                } 
                this.reportdata.push(repD);
              })
              console.log("report data : ",this.reportdata);
              });
              this.custD.valueChanges().subscribe(i=>{
                console.log("Customers : ",i);
                this.allcust=i;
              });
            }
          })
        ).subscribe();
      });
      
    }
  checkadmn(data):any{
    var isuser=true;
    this.alluser.map(i=>{
      if(i.email==data.email){
        isuser=false;
      }
    });
    return isuser;
  }
  checkcity(data){
    var iscity=true;
    this.alladmins.map(i=>{
      if(i.city==data.city){
        iscity=false;
      }
    });
    return iscity;
  }
  checkEcity(data){
    var isnewcity=true;
    this.cities.map(i=>{
      if (i.cityname==data.cityname){
        isnewcity=false;
      }
    });
    return isnewcity;
  } 
  newadmintodb(data:admin){
    this.firedb.collection('admins').doc(data.email).set(data).then(i=>{
      console.log("Admin added to adminDB..!");
    });
  }
  newadmininvite(data:admin)
  {
    console.log();
    const actionCodeSettings = {
      url: 'http://localhost:4200/adminverify', 
      handleCodeInApp: true
    };
    try{
      this.auth.sendSignInLinkToEmail(data.email,actionCodeSettings);
      window.localStorage.setItem("emailForSignIn",data.email);
      this.emisnd=true;
      console.log(" Admin Invitied ...!");
    }
    catch(err){
      console.log(err.code);
    }
  }
  newcity(data:city){
    console.log("new City : ", data);
    this.firedb.collection('cities').doc(data.cityname).set(data);
  }
  editadmin(data:admin){
    console.log("edit admin : ",data);
    this.firedb.collection('admins').doc(data.email).update({
      bankaccountno:data.bankaccountno,
      city:data.city,
      name:data.name,
      phone:data.phone
    }).then(i=>{
      console.log("UPdated..!");
    })
  }
  removeadmin(data){
    console.log("Deleting : ",data);
    this.firedb.collection('admins').doc(data.email).delete().then(i=>{
      console.log("Deleted..!");
    })
  }
}
