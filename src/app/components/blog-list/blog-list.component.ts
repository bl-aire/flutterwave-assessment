import { Component, OnInit, OnDestroy } from '@angular/core';
import { IData } from '../_shared/datainterface';
import { Subscription } from 'rxjs';
import { DataService } from '../_shared/data.service';
import {
  Flutterwave,
  InlinePaymentOptions,
  PaymentSuccessResponse,
} from "flutterwave-angular-v3";
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  timePublished: string = "2 Months ago"
  totalReadTime: string = "12 Min Read"

  errorMessage: string = '';
  sub: Subscription | any;

  posts: IData[] = [];

  constructor(private dataService : DataService, private flutterwave: Flutterwave, private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.spinner.show();
    this.sub = this.dataService.getPosts().subscribe({
      next: posts => {
        this.posts = posts;
        setTimeout(() => {
          this.spinner.hide();
        }, 3000);
    
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }


  publicKey = "FLWPUBK_TEST-08976f7d01df473244698700d4cd64e7-X";
  amount: number = 25;

  customerDetails = {
    name: "Demo Customer  Name",
    email: "customer@mail.com",
    phone_number: "08100000000",
  };

  customizations = {
    title: "Customization Title",
    description: "Customization Description",
    logo: "https://flutterwave.com/images/logo-colored.svg",
  };

  meta = { counsumer_id: "7898", consumer_mac: "kjs9s8ss7dd" };

  makePaymentCallback(response: PaymentSuccessResponse): void {
    console.log("Pay", response);
    this.flutterwave.closePaymentModal(5);
  }
  closedPaymentModal(): void {
    console.log("payment is closed");
  }
  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }


 
}


function id(id: any, number: any) {
  throw new Error('Function not implemented.');
}
 // ngOnInit(): void {
   // this.http.get('https://techcrunch.com/wp-json/wp/v2/posts')
    //.subscribe(Response => {
     // if(Response){ 
       // hideloader();
      //}
     // console.log(Response)
     // this.blog=Response;
     // this.list=this.blog.list;
   // });
    //function hideloader(){
    //  document.getElementById('loading').style.display = 'none';}
    //}
  


