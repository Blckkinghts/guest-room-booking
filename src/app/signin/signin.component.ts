import { Component, OnInit ,OnDestroy} from '@angular/core';
import {Router} from '@angular/router'
import { tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthProvider, LinkMenuItem } from 'ngx-auth-firebaseui';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import {User} from '../user.model';
import { FirebserService } from '../firebser.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  providers=AuthProvider;
  data:Observable<any>;
  usermail;
  constructor(private route:Router,private fierbser:FirebserService,private firedb: AngularFirestore,private aft:AngularFireAuth) {
    this.aft.authState.pipe(
      tap(user=>{
        if (user){
          console.log("A User in Signin");
          console.log("User verified ...? : "+user.emailVerified);
          console.log(user.uid);
          this.usermail=user.email;
        }
        else{
          this.usermail="";
          console.log("Non");
        }
      })
    ).subscribe();
   }
  success(){
    this.aft.authState.pipe(
      tap(user=>{
        if (user && user.emailVerified){
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
          this.usermail="";
        }
      })
    ).subscribe();
  }
  login(){
    this.route.navigateByUrl('register');
  }
  ngOnInit(): void {
    this.fierbser.getallusers(); 
  }

}
