import { ChangeDetectorRef, Component, Input, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { startWith,map } from 'rxjs/operators';
@Component({
    templateUrl: './editdialog.html',
    styleUrls: ['./users.component.css']
})
export class EditDialog implements OnInit{
    userDetailsForm: FormGroup;
 
  name;phone;cit;email;addrs;
  cities 
    constructor(@Inject(MAT_DIALOG_DATA) private data: any , 
    private fb: FormBuilder,private dialogRef : MatDialogRef<EditDialog>){}
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
      this.name=this.data.name;
      this.cit=this.data.city;
      this.email=this.data.email;
      this.phone=this.data.phone;
      this.addrs=this.data.addrs;
    } 
    createForms() {
      this.userDetailsForm = this.fb.group({
        fullname: [null, Validators.required ],
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
        phone:this.phone 
      }
      console.log(data)
      this.dialogRef.close(data);
    }
    onNoClick(){
      this.dialogRef.close();
    }
}