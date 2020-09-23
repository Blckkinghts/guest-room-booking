import { ChangeDetectorRef, Component, Input, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { startWith,map } from 'rxjs/operators';

@Component({
    templateUrl: './roomdialog.html',
    styleUrls: ['./dashboard.component.css']
})
export class RoomDialog implements OnInit{
    myControl = new FormControl();
    userform:FormGroup
    option=[] 
    roomname;roomaddr;roomdes;roomcity;roomloc;
    filteredOptions: Observable<string[]>;
    ngOnInit() {
        
      this.roomcity=this.data.city;
      console.log(this.data);
      this.option=this.data.localtites;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    }
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.option.filter(option => option.toLowerCase().includes(filterValue));
    }
    constructor(@Inject(MAT_DIALOG_DATA) private data: any , private frb:FormBuilder,private dialogRef : MatDialogRef<RoomDialog>){
        this.userform=this.frb.group({
            rname:new FormControl(null, Validators.compose([
                Validators.required
            ])),
            raddr:new FormControl(null, Validators.compose([
                Validators.required
            ])),
            rdes:new FormControl('', Validators.compose([
                Validators.required
            ])),
            rcity:new FormControl('', Validators.compose([
                Validators.required
            ])),
        })
    }
    save(){
        
        if(this.option.indexOf(this.roomloc.trim())==-1){
            console.log(this.roomaddr,this.roomname,this.roomloc,this.roomdes,this.roomcity);
            this.dialogRef.close({
                roomname:this.roomname.trim(),
                locality:this.roomloc.trim(),
                address:this.roomaddr.trim(),
                roomdes:this.roomdes.trim(),
                city:this.roomcity,
                status:'available'
            });
        }
        else{
            console.log("ERR in rooms..!")
        }
        
    }
    onNoClick(){
        this.dialogRef.close();
    }
}