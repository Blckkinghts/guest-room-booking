import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
@Component({
    templateUrl: './citydialog.html',
    styleUrls: ['./dashboard.component.css']
})
export class CityDialog implements OnInit{
    myControl = new FormControl();
    pin
    cityform:FormGroup
   cityname:string;tot
    ngOnInit() {
        console.log(this.data);
    }
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  localities = [];
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.localities.push({loc_name:value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }
  remove(ind): void {
    const index = this.localities.indexOf(ind);
    if (index >= 0) {
      this.localities.splice(index, 1);
    }
  }
    constructor(@Inject(MAT_DIALOG_DATA) private data: any , 
    private frb:FormBuilder,private dialogRef : MatDialogRef<CityDialog>){
        this.cityform=this.frb.group({
            cname:new FormControl(null, Validators.compose([
                Validators.required
            ])),
            ctot:new FormControl(null,Validators.required),
            locF:new FormControl(null,Validators.required)
        })
    }
    save(){
        if(this.tot==this.localities.length){
            var data={
                cityname:this.cityname,
                canbook:true,
                localities:this.localities,
                nick:(this.cityname.charAt(0)+this.cityname.charAt(this.cityname.length/2)+this.cityname.charAt(this.cityname.length-1)).toUpperCase(),
                tot_no_rooms:this.tot
            }
            this.dialogRef.close(data);
        }
        else{
            alert("Oops.! Total No.rooms should be equal to No.localities..");
        }
        
    }
    onNoClick(){
        this.dialogRef.close();
    }

}