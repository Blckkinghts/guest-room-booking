import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MediaMatcher } from '@angular/cdk/layout';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router} from '@angular/router'
import { tap } from 'rxjs/operators';
import { UserserService } from '../userser.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  value;serch
  mobileQuery: MediaQueryList;
  alluser;role
  private _mobileQueryListener: () => any;
  constructor( private userser:UserserService,private route:Router,private firedb:AngularFirestore,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
   private auth:AngularFireAuth) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
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
            if (this.role=='Customer'){
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
