import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {User} from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap } from 'rxjs/operators';

import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class FirebserService {
  allusers:any[];bookedrooms:any[]
  role;
  bookD
  constructor(private auth:AngularFireAuth,private firedb:AngularFirestore) { 
    this.bookD=this.firedb.collection('bookedrooms');
    this.getallusers()
    this.bookD.valueChanges().subscribe(i=>{
      this.bookedrooms=i; //MAIN BLOCK TO UPDATE ALL
      console.log("Booked Rooms : ",this.bookedrooms);
      this.bookedrooms.map(b=>{
        var date=firebase.firestore.Timestamp.fromDate(new Date());
        //"Tue Sep 24 2020 17:01:26 GMT+0530 (India Standard Time)"
        b.daterange.map(d=>{
          var dend=d.end;
          var dstart=d.start;
          if(date>=d.end){
            this.firedb.collection('bookedrooms').doc(b.locality).update({
              daterange:firebase.firestore.FieldValue.arrayRemove({start:dstart,end:dend})
            }).then(rm=>{
              this.firedb.collection('rooms').doc(b.locality).update({
                booked_his:firebase.firestore.FieldValue.arrayRemove({customer_mail:b.customer_mail,startdate:dstart,enddate:dend})
              })
            })
            .then(cus=>{
              // console.log("UPDATE IN CUS : ",{city:b.city,daterange:{end:dend,start:dstart},locality:b.locality})
              this.firedb.collection('admins').doc(b.admin_mail).get().subscribe(adn=>{
                var ad=adn.data()
                var admin_info={adnname:ad.name,adnmail:ad.email,adnphone:ad.phone}
                this.firedb.collection('customer').doc(b.customer_mail).update({
                  currently_booked:firebase.firestore.FieldValue.arrayRemove({
                    adminmail:admin_info.adnmail,
                    adminname:admin_info.adnname,
                    adminphone:admin_info.adnphone,
                    city:b.city,
                    daterange:{end:dend,start:dstart},
                    locality:b.locality
                  }),
                  history:firebase.firestore.FieldValue.arrayUnion({
                    city:b.city,
                    daterange:{end:dend,start:dstart},
                    locality:b.locality,
                    admin_info:admin_info
                  })
                })
              })
            }).then(oi=>{
              console.log("Updated ALLLL .1");
            })
          }
          console.log("ALL CHECK")
        })
      })
    });
    
  }
  newcustomer(data:User){
    this.firedb.collection('users').doc(data.uid).set(data);
  }
  getallusers(){
    var data=this.firedb.collection('users').valueChanges();
    data.subscribe(i=>{
      this.allusers=i;
      console.log("from firebser ",this.allusers);
    });
  }
  getrole(uid):string{
    this.role=(this.allusers.find(i=>i.uid==uid).role);
    return this.role;
  }
}
