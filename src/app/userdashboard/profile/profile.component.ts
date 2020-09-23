import { Component, OnInit } from '@angular/core';
import { UserserService } from '../userser.service';
interface cust{
  name:string,email:string,history:any[],currently_booked:any[],location:string,phone:string,photoURL:string,Address:string
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userser:UserserService) {}
  profiledata:cust;
  ngOnInit(): void {
    this.profiledata=this.userser.mydet;
    console.log(this.profiledata);
  }

}
