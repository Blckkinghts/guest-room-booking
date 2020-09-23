import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpradminserService } from '../spradminser.service';
import {CityDialog} from '../dashboard/citydialog'
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  constructor(private sprser:SpradminserService,private snacke:MatSnackBar,private dialog:MatDialog) { }
  allcities:any[];
  cities=[];
  @Input() search: string;
  ngOnInit(): void {
    this.sprser.cityD.valueChanges().subscribe(i=>{
      console.log("cities : ",i);
      this.allcities=i;
      this.dataSource=this.allcities;
      console.log(this.dataSource);
    })
  }
  opencitydialog(){
    const dialogRef = this.dialog.open(CityDialog, {
      data: {},width:'400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(this.sprser.checkEcity(result)){
          this.sprser.newcity(result);
          this.snacke.open("New City Added","",{duration:1000});
        }
        else{
          console.log("Already exist..!");
          this.snacke.open("Already exist..!","",{duration:1000});
        }
      }
      else{
        console.log("No ACtion");
        this.snacke.open("Canceled","",{duration:1000});
      }
    });
  }
  displayedColumns: string[] = [ 'Code','City', 'Rooms', 'Location','Add'];
  dataSource:any[] ;
}
