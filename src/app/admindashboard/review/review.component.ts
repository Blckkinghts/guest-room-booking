import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminserService } from '../adminser.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  barcdata=[];
  cities=[];
  @Input() search: string;
  constructor(private snacke:MatSnackBar,private dialog:MatDialog,private adminser:AdminserService){}
  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true
  }
  public options = {
    scales: 
    {
        yAxes: [{
            ticks: {
                max: 10,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                min: 0,
                stepSize: 1
            }
        }]
    }
};
public barChartColors:Array<any> = [
  {
    backgroundColor: 'rgb(128, 191, 255)',
    borderColor: 'rgba(105,159,177,1)',
    pointBackgroundColor: 'rgba(105,289,177,1)',
    pointBorderColor: '#fafafa',
    pointHoverBackgroundColor: '#fafafa',
    pointHoverBorderColor: 'rgba(105,159,177)'
  }
];
public pieChartData = [
  {data: [2,3], label:'No. of rooms booked'},   //tot no rooms
];
public pieChartType = 'pie';

rromcnt=[];
  // public short=['A','B','C','D'];
  // public barChartLabels = [{key:'A',value:'Old Bus Stand'},{key:'B',value:'New Bus Stand'},{key:'C',value:'4-Roads'},{key:'D',value:'New Bus stand1'}];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [0,2,1,0], label: 'No. of rooms booked'},
  ];
  // public short1=['A','B'];
  // public barChartLabels1 = [{key:'A',value:'Gandhipuram'},{key:'B',value:'Saravanapatti'}];
  public barChartType1 = 'bar';
  public barChartLegend1 = true;
  public barChartData1 = [
    {data: [10,2], label: 'No. of rooms booked'},
  ];

  ngOnInit(): void {
    this.barcdata=this.adminser.reportdata;
    console.log(this.barcdata);
    this.cities=this.adminser.cities.map(i=>{
      return i.cityname;
    });
    this.rromcnt=[{
      data:this.adminser.cities.map(i=>{
        return i.tot
      })
      ,
      lable:'Total NO Romms'
    }]
    console.log(this.cities);
  }
}
