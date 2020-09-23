import { ChangeDetectorRef, Component, Input, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { startWith,map } from 'rxjs/operators';
@Component({
    templateUrl: './admindialog.html',
    styleUrls: ['./dashboard.component.css']
})
export class AdminDialog implements OnInit{
    userDetailsForm: FormGroup;
  genders = [
    "Male",
    "Female",
    "Other"
  ];
  adname;phone;cit;acctno;email;gender;
  cities = [];
  validation_messages = {
    'flname': [
      { type: 'required', message: 'Full Name is required' }
    ],
    'gender': [
      { type: 'required', message: 'Please select your gender' },
    ],
    'city': [
      { type: 'required', message: 'Please select your city' },
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'mobile': [
      { type: 'required', message: 'Mobile Number is required' },
      { type: 'pattern', message: 'It contains only digits' },
      { type: 'minlength', message: 'It should be 10 digits' },
      { type: 'maxlength', message: 'It should be 10 digits' },
    ],
    'account': [
      { type: 'required', message: 'Account Number is required' },
      { type: 'pattern', message: 'It contains only digits' },
      { type: 'minlength', message: 'It should be min 10 digits' },
      { type: 'maxlength', message: 'It should be max 16 digits' },
    ],
  };
  constructor(@Inject(MAT_DIALOG_DATA) private data: any ,private fb: FormBuilder,private dialogRef : MatDialogRef<AdminDialog>) { }
  ngOnInit() {
    this.createForms();
    this.cities=this.data.city;

  } 
  createForms() {
    this.userDetailsForm = this.fb.group({
      flname: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      gender: new FormControl(this.genders[0], Validators.required),
      city: new FormControl(this.cities[0], Validators.required),
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      mobile: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.maxLength(10),
        Validators.minLength(10),
      ])),
      account:new FormControl(null,Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.minLength(10),
        Validators.maxLength(14),
      ]))
    });
  }

  arr=[]
  save(){
    var data={  
      name:this.adname,email:this.email,city:this.cit,
      phone:this.phone,bankaccountno:this.acctno,gender:this.gender  
    }
    console.log(data);
    this.dialogRef.close(data);
  }
  onNoClick(){
    this.dialogRef.close();
  }
}