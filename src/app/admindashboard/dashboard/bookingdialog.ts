import {  Component, Input, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Observable } from 'rxjs';
import { startWith,map } from 'rxjs/operators';

@Component({
    templateUrl: './bookingdialog.html',
    styleUrls: ['./dashboard.component.css']
})
export class BookingDialog implements OnInit{
    NBookform:FormGroup;
    OBookform:FormGroup;
    range;range1;stus=0;
    option=[]; 
    myControl = new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ]));
    minDate
   maxDate 
    name;email;phone;locality;address;mastuts;city;gender;ucity
    start;end;genders:string[] = [
        "Male",
        "Female",
        "Other"
      ];
    local=[];auto
    filteredOptions: Observable<string[]>;
    constructor(@Inject(MAT_DIALOG_DATA) private data: any,private aft:AngularFireAuth,
    private dialogRef: MatDialogRef<BookingDialog>,private frb:FormBuilder){
        this.minDate = new Date();
        this.maxDate = new Date(2030, 0, 1);
        this.range = new FormGroup({
            start: new FormControl('', Validators.compose([
                Validators.required])),
            end: new FormControl('', Validators.compose([
                Validators.required]))
        })
        this.range1 = new FormGroup({
            start: new FormControl('', Validators.compose([
                Validators.required])),
            end: new FormControl('', Validators.compose([
                Validators.required]))
        })
        this.NBookform=this.frb.group({
            uname: [null, Validators.required ],
            uphone: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('[0-9]+'),
                Validators.maxLength(10),
                Validators.minLength(10),
              ])),
            uemail:new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            uscity:new FormControl('',Validators.required),
            gender: new FormControl(this.genders[0], Validators.required),
            city:['',Validators.required],
            locality:new FormControl(this.local[0], Validators.required),
            masts:['',Validators.required],
            addr:new FormControl(null,Validators.compose([
                Validators.required,
                Validators.minLength(10)
              ])),
        })
        this.OBookform=this.frb.group({
            uphone: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('[0-9]+'),
                Validators.maxLength(10),
                Validators.minLength(10),
              ])),
            
            city:['',Validators.required],
            locality:new FormControl(this.local[0], Validators.required),
        })
        
    }
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.option.filter(option => option.toLowerCase().includes(filterValue));
    }
    ngOnInit(): void {
        this.city=this.data.city;
        this.local=this.data.localtites;
        this.option=this.data.custmail; 
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    }
    tabChanged(eve: MatTabChangeEvent){
        this.stus=eve.index;
    }
    onNoClick(range,range1) {
        if(this.stus==1){
            if(range1.value.start=="" || range1.value.end==""){
                alert("Invalid Date Range");
            }
            else{
                var odata={email:this.email,city:this.city,
                    locality:this.locality,
                    phone:this.phone,
                    start:range1.value.start,
                    end:range1.value.end,
                    userst:this.stus
                };
                this.dialogRef.close(odata);
            }
        }
        else{
            if(range.value.start=="" || range.value.end==""){
                alert("Invalid Date Range");
            }
            else{
                var ndata={name:this.name,
                    city:this.city,
                    email:this.email,
                    locality:this.locality,
                    phone:this.phone,
                    start:range.value.start,
                    end:range.value.end,
                    userst:this.stus,
                    address:this.address,
                    gender:this.gender,
                    ucity:this.ucity
                }
                this.dialogRef.close(ndata);
            }
        }
    }
    close(){
        this.dialogRef.close(0);
    }
    
}