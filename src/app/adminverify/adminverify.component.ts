import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-adminverify',
  templateUrl: './adminverify.component.html',
  styleUrls: ['./adminverify.component.css']
})
export class AdminverifyComponent implements OnInit {

  errorMessage: any;
  userData:any;
  constructor(private firedb:AngularFirestore,private auth:AngularFireAuth,private route:Router,private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    const url=this.route.url;
    console.log(url); 
    this.confirmSignIn(url);
    this.createForm();
  }
  log(){
    this.auth.signOut().then(i=>{
      this.route.navigateByUrl('user');
    });
  }
  formGroup: FormGroup;
  phone;name
  createForm() {
    this.formGroup = this.formBuilder.group({
      'phone':[null,[
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.maxLength(10),
        Validators.minLength(10),
      ]],
      'fname':[null,[
        Validators.required,
        Validators.pattern('^[a-zA-z]+')]],
      'validate': ''
    });
  }

  onSubmit(val) {
    this.userData.phoneNumber=this.phone
    this.userData.displayName=this.name;
    console.log(this.userData);
    this.auth.sendPasswordResetEmail(this.userData.email);
    this.firedb.collection('users').doc(this.userData.uid).set(this.userData);
    alert("Password...! Check your mail");
    this.route.navigateByUrl('');
  }
  async confirmSignIn(url) {
    try {
      if (this.auth.isSignInWithEmailLink(url)) {
        let email = window.localStorage.getItem('emailForSignIn');
        // If missing email, prompt user for it
        if (!email) {
          email = window.prompt('Please provide your email for confirmation');
        }
        // Signin user and remove the email localStorage
        const result = await this.auth.signInWithEmailLink(email, url);
        window.localStorage.removeItem('emailForSignIn');
        console.log(result);
        this.userData={
          uid:result.user.uid,
          displayName:result.user.displayName,
          email:result.user.email,
          phoneNumber:result.user.phoneNumber,
          role:"admin",
          photoURL:result.user.photoURL==null ? "https://img.icons8.com/color/100/000000/person-male.png" : result.user.photoURL,
          providerId:result.user.providerId
        }
        
      }
    } catch (err) {
      this.errorMessage = err.message;
      console.log(err.message);
      alert("Oops..!Something went Wrong..")
      this.route.navigateByUrl('');
    }
  }
}
