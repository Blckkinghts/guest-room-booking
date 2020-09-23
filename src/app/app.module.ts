import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import {FirebaseProvider,FirebaseModule} from 'angular-firebase'
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FirebserService } from './firebser.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {MaterialModule} from './material/material.module'
import {environment} from '../environments/environment';
import { FlexLayoutModule } from "@angular/flex-layout";
import {SigninComponent} from './signin/signin.component'
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { MatIconRegistry } from '@angular/material/icon';
import { RegisterComponent } from './register/register.component';
import { AdminverifyComponent } from './adminverify/adminverify.component';
import { UserverifyComponent } from './userverify/userverify.component';
@NgModule({
  declarations: [
    AppComponent,SigninComponent, RegisterComponent, AdminverifyComponent, UserverifyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    MatPasswordStrengthModule.forRoot(),
    MaterialModule,FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,AngularFireDatabaseModule,
    AngularFirestoreModule,AngularFireAuthModule,AngularFireModule.initializeApp(environment.firebaseConfig),
    NgxAuthFirebaseUIModule.forRoot({
      apiKey: "AIzaSyBFDJbGdh8XSD5V_mt6p5nEMIVRCEYQ8xo",
      authDomain: "rapp-877.firebaseapp.com",
      databaseURL: "https://rapp-877.firebaseio.com",
      projectId: "rapp-877",
      storageBucket: "rapp-877.appspot.com",
      messagingSenderId: "809778872212",
      appId: "1:809778872212:web:01ecdc0a14c85600c3d981",
      measurementId: "G-4PCKRM78X9"
    },()=>{return "Rapp"},{enableFirestoreSync:false})
  ],
  providers: [FirebserService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private matIconRegistry: MatIconRegistry, private domSanitzer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('google', this.domSanitzer.bypassSecurityTrustResourceUrl('/assets/mdi/google.svg'))
      .addSvgIcon('google-colored', this.domSanitzer.bypassSecurityTrustResourceUrl('/assets/google.svg'))
      .addSvgIcon('facebook', this.domSanitzer.bypassSecurityTrustResourceUrl('/assets/mdi/facebook.svg'))      
      .addSvgIcon('github', this.domSanitzer.bypassSecurityTrustResourceUrl('/assets/mdi/github-circle.svg'));
  }
}
