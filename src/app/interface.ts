export interface user{
  displayName:string,email:string,phoneNumber:number,photoURL:string,providerId:string,role:string,uid:string
}
export interface book{
  name:string,email:string,locality:string,phone:string,start:Date,end:Date,city:string
}
export interface cust{
  name:string,email:string,history:any[],currently_booked:any[],location:string,phone:string,photoURL:string,Address:string
}
export interface city{
  canbook:boolean,cityname:string,localities:[{loc_name:string}],nick:string,tot_no_rooms:number
}
export interface admin{
  email:string,gender:string,bankaccountno:string,name:string,phone:string,city:string
}
export interface bookedrooms{
  admin_mail:string,city:string,customer_mail:string,daterange:[{end:any,start:any}],locality:string
}
export interface room{
  address:string,booked_his:[{customer_mail:string,enddate:any,startdate:any}],city:string,locality:string,roomname:string,roomsdes:string,status:string
}
export interface superadmin{
  email:string,name:string,phone:number
}