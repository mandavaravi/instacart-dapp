import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { EmartService } from 'src/app/services/emart.service';

@Component({
  selector: 'app-bill-view',
  templateUrl: './bill-view.component.html',
  styleUrls: ['./bill-view.component.css']
})
export class BillViewComponent implements OnInit {
  cartItems: any ;
  amount: number = 0;
  allBills: any;
  currentBuyer: any;
  todayDate : Date = new Date();


  

  constructor(protected emartService: EmartService,
              protected router: Router) { 
                this.allBills = [];
              }

  ngOnInit(): void {


    // if(JSON.parse(localStorage.getItem("currentBuyer")).buyerId != 0){
      
      this.currentBuyer = this.emartService.getCurrentBuyer();
      this.cartItems = this.emartService.getAllCart();
      let size = this.cartItems.length;
  
      for(let i=0;i<size;i++){
        this.amount = this.amount + this.cartItems[i].itemPrice;
      }
    // }
    // else{
    //   this.router.navigate(['/']);
    // }

  }

    addBill(){
      this.emartService.addBill(this.todayDate, this.amount).subscribe(
        (res)=>{
          let newBill: any = res;

          this.emartService.getAllBills(this.currentBuyer.buyerId).subscribe(
            (res: any)=>{
              this.allBills = res;
              this.emartService.setAllBills(this.allBills);
            }
          );

        }
      );
      this.router.navigate(['item-list']);
    }

}
