import { Component, OnInit ,OnDestroy} from '@angular/core';
import {Router} from '@angular/router'
import { tap } from 'rxjs/operators';
import { AuthProvider, LinkMenuItem } from 'ngx-auth-firebaseui';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import {User} from '../user.model';
import { FirebserService } from '../firebser.service';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  providers=AuthProvider;
  role;
  constructor(private route:Router,private fierbser:FirebserService,private aft:AngularFireAuth,private firedb:AngularFirestore) { }
  success(){
    this.aft.authState.pipe(
      tap(user=>{
        if (user && user.emailVerified){
          console.log("A User in Signin");
          console.log("User verified ...? : "+user.emailVerified);
          var cruser:User={
            displayName:user.displayName,
            email:user.email,
            phoneNumber:user.phoneNumber,
            photoURL:user.photoURL,
            providerId:user.providerId,
            uid:user.uid,
            role:"Customer"
          }
          console.log(cruser);
          this.firedb.collection('users').doc(user.uid).ref.get().then((i)=>{
            if( i.exists){
              console.log("Exist..!");
              var role=this.fierbser.getrole(user.uid);
              if(role=="Customer"){
                this.route.navigateByUrl('user');
              }
              if(role=="admin"){
                this.route.navigateByUrl('admin');
              }
              if(role=="superadmin"){
                this.route.navigateByUrl('superadmin');
              }
            }
            else{
              console.log("New Usesr..!");
              this.fierbser.newcustomer(cruser);
              this.route.navigateByUrl("user");
            }
          })
          
        }
        else{
          console.log("No User in Signin..");
        }
      })
    ).subscribe();
  }
  
  ngOnInit(): void {
  }

}
