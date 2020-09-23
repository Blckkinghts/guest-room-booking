import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserserService } from '../userser.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit {
  private _mobileQueryListener: () => any;
  @Input() search: string;
  mobileQuery: MediaQueryList;
  gridColumns=100;
  constructor(private ref: ChangeDetectorRef,private snacke:MatSnackBar,private dialog: MatDialog,private firedb:AngularFirestore,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private userser:UserserService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener)  }
  myhis=[]
  mybkg=[]
  ngOnInit(): void {
    this.myhis=this.userser.myhis;
    this.mybkg=this.userser.mybkg;
  }

}
