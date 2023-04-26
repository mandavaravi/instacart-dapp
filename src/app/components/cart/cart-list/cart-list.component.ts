import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { EmartService } from 'src/app/services/emart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  cartItems: any;
  isEmpty: boolean = true;
  currentBuyer: any;
  constructor(protected emartService: EmartService, protected router: Router) { }

  ngOnInit(): void {


    // if(JSON.parse(localStorage.getItem("currentBuyer")).buyerId != 0){
    this.cartItems = this.emartService.getAllCart();

    if (this.cartItems.length == 0) {
      this.isEmpty = false;
    }
    else {
      this.isEmpty = true;
    }
    // }
    // else{
    //   this.router.navigate(['/']);
    // }

  }

  deleteCartItem(itemNo: number) {
    this.cartItems = this.emartService.deleteCartItem(itemNo);
    if (this.cartItems.length == 0) {
      this.isEmpty = false;
    }
    else {
      this.isEmpty = true;
    }
  }

  checkOut(Items: any) {
    this.emartService.setAllCart(Items);
    this.router.navigate(['bill-view']);
  }

}
