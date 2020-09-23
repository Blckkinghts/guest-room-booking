import { ChangeDetectorRef, Component, Input, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { startWith,map } from 'rxjs/operators';
export class User{
    num ? : string;
    //email ? : string;
}
@Component({
    templateUrl: './userdailog.html',
    styleUrls: ['./dashboard.component.css']
})
export class UserDialog implements OnInit {
  userDetailsForm: FormGroup;
  genders = [
    "Male",
    "Female",
    "Other"
  ];
  name;phone;cit;acctno;email;gender;mobile;addrs;
  cities 
    constructor(@Inject(MAT_DIALOG_DATA) private data: any , private fb: FormBuilder,private dialogRef : MatDialogRef<UserDialog>){}
    validation_messages = {
      'fullname': [
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
      'addr':[
        {type:'required' ,message:'Address is required'},
        { type: 'minlength', message: 'It should be 10 digits' }
      ]
    };
    
    ngOnInit() {
      this.createForms();
    } 
    createForms() {
      this.userDetailsForm = this.fb.group({
        fullname: [null, Validators.required ],
        gender: new FormControl(this.genders[0], Validators.required),
        city: new FormControl(null, Validators.required),
        addr: new FormControl(null,Validators.compose([
          Validators.required,
          Validators.minLength(10)
        ])),
        email: new FormControl(null, Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        mobile: new FormControl(null, Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]+'),
          Validators.maxLength(10),
          Validators.minLength(10),
        ]))
      });
    }
    onSubmit(){
      var data={
        name:this.name,
        Address:this.addrs,
        email:this.email,
        location:this.cit,
        phone:this.phone,
        photoURL:'' 
      }
      this.dialogRef.close(data);
    }
    onNoClick(){
      this.dialogRef.close();
    }
}
