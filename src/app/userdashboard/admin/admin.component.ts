import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { UserserService } from '../userser.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  serch;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => any;
  constructor(private router: Router,
    public route: ActivatedRoute,
    private userser:UserserService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  this.mobileQuery.addListener(this._mobileQueryListener);
  }
  displayedColumns = ['name', 'email', 'phone', 'City', 'bank_acc_no'];
  dataSource=[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.userser.adminD.valueChanges().subscribe(i=>{
      console.log("Admins :",i);
      this.dataSource=i;
    });
    this.dataSource=this.userser.alladmins;
  }

}
