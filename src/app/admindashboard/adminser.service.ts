import { Injectable } from '@angular/core';
import { FirebserService } from '../firebser.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import {bookedrooms, city, user ,book,cust,admin}from '../interface'
export interface room{
  address:string,booked_his:[{customer_mail:string,enddate:any,startdate:any}],city:string,locality:string,roomname:string,roomsdes:string,status:string
}
@Injectable({
  providedIn: 'root'
})
export class AdminserService {
  alluser:user[];
  alladmins:admin[];
  allcust:cust[];
  allcities:city[];
  cities:any[];
  allrooms:room[];
  curusr_rms:any[];
  curcity_loc:any[];
  custmail:any[];
  bookedrooms:bookedrooms[];
  role:string;email:string;phone:string;name:string
  adncity:string;
  usersD;adminD;custD;bookD;cityD;roomD;
  emisnd: boolean;
  reportdata: any[]=[];
  constructor(private auth:AngularFireAuth,private firebser:FirebserService,private firedb:AngularFirestore) { 
    this.usersD=this.firedb.collection('users');
    this.adminD=this.firedb.collection('admins');
    this.custD=this.firedb.collection('customer');
    this.bookD=this.firedb.collection('bookedrooms');
    this.cityD=this.firedb.collection('cities');
    this.roomD=this.firedb.collection('rooms');
    this.usersD.valueChanges().subscribe( i => {
      this.alluser = i;
      this.auth.authState.pipe(
        tap(user => {
          if (user) {
            this.role = this.alluser.find(i => i.uid == user.uid).role;
            this.email=user.email;
            this.firedb.collection('admins').doc(this.email).valueChanges().subscribe((i:any)=>{
              console.log("Admins : ",i);
              this.adncity=i.city;
              this.name=i.name;
              this.phone=i.phone;
              console.log(this.adncity);
            });
            this.roomD.valueChanges().subscribe(i=>{
              console.log("Rooms : ",i);
              this.allrooms=i; 
              this.curcity_loc=[];
              this.curusr_rms=this.allrooms.filter(i=>{
                if(i.city==this.adncity){
                  this.curcity_loc.push(i.locality);
                  return(i);
                }
              });
              
            })
            this.bookD.valueChanges().subscribe(i=>{
              this.bookedrooms=i; //MAIN BLOCK TO UPDATE ALL
              console.log("Booked Rooms : ",this.bookedrooms);
            });
            this.cityD.valueChanges().subscribe(i=>{
              console.log("cities : ",i);
              this.cities=[];
              this.allcities=i;
              this.allcities.map(c=>{
                this.cities.push({cityname:c.cityname,tot:c.tot_no_rooms});
              })
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
              
            })
            this.custD.valueChanges().subscribe(i=>{
              console.log("Customers : ",i);
              this.allcust=i;
              this.custmail=[]
              this.allcust.map(i=>{
                this.custmail.push(i.email);
              });
              
            });
          }
        })
      ).subscribe();
    });
  }
  newuserbk(data){
    console.log("NEW USER IS BOOKED ..!");
    var Udata={
      name:data.name,
      Address:data.address,
      email:data.email,
      location:data.ucity,
      phone:data.phone,
      photoURL:''
    }
    this.firedb.collection('customer').doc(data.email).set(Udata).then(i=>{
      console.log("user added to customerdb..!");
    }).then(i=>{
      this.newuser(Udata);
    }).then(i=>{
      this.olduserbk(data);
    });
  }
  olduserbk(data :book){
    console.log("OLD USER BOOKING..!");
    this.firedb.collection('cities').doc(data.city).get().subscribe(i=>{
      var citd=i.data();
      this.firedb.collection('bookedrooms').doc(data.locality).ref.get().then(i=>{
        if(i.exists){
          this.firedb.collection('bookedrooms').doc(data.locality).update({
            daterange:firebase.firestore.FieldValue.arrayUnion({
              start:firebase.firestore.Timestamp.fromDate(data.start),
              end:firebase.firestore.Timestamp.fromDate(data.end)
            }),
          })
        }
        else{
          this.firedb.collection('bookedrooms').doc(data.locality).set({
            city:data.city,
            customer_mail:data.email,
            admin_mail:this.email,
            daterange:[{
              start:firebase.firestore.Timestamp.fromDate(data.start),
              end:firebase.firestore.Timestamp.fromDate(data.end)
            }],
            locality:data.locality
          })
        }
      }).then(i=>{
        this.firedb.collection('rooms').doc(data.locality).update({
          status:"available",
          booked_his:firebase.firestore.FieldValue.arrayUnion({
            customer_mail:data.email,
            startdate:firebase.firestore.Timestamp.fromDate(data.start),
            enddate:firebase.firestore.Timestamp.fromDate(data.end)
          })
        })
      }).then(i=>{
        this.firedb.collection('customer').doc(data.email).update({
          currently_booked:firebase.firestore.FieldValue.arrayUnion({
            city:data.city,locality:data.locality,adminmail:this.email,adminname:this.name,adminphone:this.phone,
            daterange:{
              start:firebase.firestore.Timestamp.fromDate(data.start),
              end:firebase.firestore.Timestamp.fromDate(data.end)
            }
          })
        })
      })
    })
  }
  checkforbook(data):any{
    console.log(data);
    var canbk=true;
    var flg=0;
    if(this.checkcity(data)==1){
      if (this.bookedrooms.length > 0){
        this.bookedrooms.map(i=>{
          if (i.city==data.city && i.locality==data.locality){
            if(i.daterange.length>0){
              i.daterange.map(j=>{
                console.log("insde : ",canbk);
                if( this.checkdate(data.start,data.end,j.start.toDate(),j.end.toDate())){
                    canbk=false;
                    console.log("Dates R not availavle ...! and flag is : ");
                }
                else{
                    canbk=true;
                    console.log("AVail..!");
                }
              });
            }
            else{
              console.log("Daterange is empty : ");
              canbk=true;
            }
          }
          else{
            console.log("city nor locality not found..!");
          }
        });
      }
      else{
        canbk=true;
        console.log("No Booked rooms..!");
      }
    }
    else{
      console.log("City nor locality is not avail..!");
      canbk=false;
    }
    console.log("adminser : ",canbk);
    return canbk;
  }
  checkcity(data: any):any {
    var cityavl=false;
     this.allcities.map(i=>{
      if(i.cityname==data.city ){
        console.log("city !")
        if (i.canbook==true ){
          console.log("canbook");
          i.localities.find(j=>{
            if (j.loc_name==data.locality){
              console.log("locality avail");
              cityavl=true;
            }
          });
        }
        else{
          cityavl=false;
        }
      }
    });
    return cityavl;
  }
  togcanbook(data) {
    console.log("form tog",data);
    this.firedb.collection('cities').doc(data.cityname).update({
      canbook:!(data.canbook)
    }).then(i=>{
      console.log("TOggled ..!");
    })
  }
  checkdate(start:Date,end:Date,exstart:Date,exend:Date):any {
    // console.log("Start : ",start," Exstart : ",exstart);
    // console.log("End : ",end," Exdate : ",exend);
    return (
        ((start >= exstart && start <= exend) ||
        (exstart >= start && exstart <= end)) ||
        (start >= exstart && end <= exend)
    );
  }
  checkuser(data:any):any{
    var isuser=false;
    this.allcust.map(i=>{
      if(i.email==data.email){
        console.log("yes..!");
        isuser=true;
      }
    });
    return isuser;
  }
  checkloca(data):any{
    var isloc=true;
    this.allrooms.map(i=>{
      if(i.locality==data.locality){
        isloc=false;
      }
    });
    return isloc;
  }
  newroom(data){
    this.firedb.collection('rooms').doc(data.locality).set(data);
    
    var tot;
    this.firedb.collection('cities').doc(data.city).get().subscribe(i=>{
      tot=(i.data().tot_no_rooms)+1
      console.log(tot);
      this.firedb.collection('cities').doc(data.city).update({
        tot_no_rooms:tot
      }).then(i=>{
        this.firedb.collection('cities').doc(data.city).update({
          localities:firebase.firestore.FieldValue.arrayUnion({loc_name:loc_obj.locality 
          })
        })
      }).then(i=>{
        console.log("UPDATED..!");
      }).catch(err=>{
        console.log(err);
      })
    })
    var loc_obj={
      status:"available",
      locality:data.locality
    }
  }
  newuserdb(data:any){
    this.firedb.collection('customer').doc(data.email).set(data).then(i=>{
      console.log("user added to customerdb..!");
    });
  }
  newuser(data){    
    console.log();
    const actionCodeSettings = {
      url: 'http://localhost:4200/userverify', 
      handleCodeInApp: true
    };
    try{
      this.auth.sendSignInLinkToEmail(data.email,actionCodeSettings);
      window.localStorage.setItem("emailForSignIn",data.email);
      this.emisnd=true;
      console.log(" user Invitied ...!");
    }
    catch(err){
      console.log(err.code);
    }
  }


  edituser(data:cust){
    this.firedb.collection('customer').doc(data.email).update(data).then(i=>{
      console.log("Updates//!");
    })
  }
}