import { Component, OnInit } from '@angular/core';
// import { Item } from '../../item';
import { Router } from '@angular/router';
import { EmartService } from 'src/app/services/emart.service';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})

export class ItemListComponent implements OnInit {
  allItems: any;
  currentBuyer: any;
  isfiltered: boolean = false;
  isSearched: boolean = false;
  filteredItems: any;
  searchedItems: any;
  toPrice: number;
  fromPrice: number;
  searchBar: string;
  constructor(protected emartService: EmartService, protected router: Router, private transferService: TransferService) {
    this.filteredItems = [];
    this.fromPrice = 0;
    this.toPrice = 0;
    this.searchedItems = [];
    this.searchBar = '';
  }

  ngOnInit(): void {
    // if (JSON.parse(localStorage.getItem("currentBuyer") + "").buyerId != 0) {
    //   this.emartService.getAllItems().subscribe((response: any) => {
    //     this.allItems = response;
    //   }
    //   );
    // }
    // else {
    //   this.router.navigate(['/']);
    // }
    alert('Items list :');
    console.log('items list :');
    this.allItems = this.emartService.getAllItems().subscribe((response: any) => {
      this.allItems = response.itemsList;
      this.emartService.setLocalItems(this.allItems);
    }
    );
    console.log('soll :');
    this.transferService.getAllItems();

  }

  displayItemDetails(itemId: number) {
    this.router.navigate(['/item-display/' + itemId]);
  }

  addToCart(item: any) {
    this.emartService.addToCart(item);
  }

  filterItems() {
    this.filteredItems = [];
    // console.log("filter length"+ this.filteredItems.length);
    if (this.toPrice > this.fromPrice) {

      for (let item of this.allItems) {
        if (item.itemPrice <= this.toPrice && item.itemPrice >= this.fromPrice) {
          this.filteredItems.push(item);
        }
      }

      if (this.filteredItems.length == 0) {
        alert("No items in that range");
        this.isfiltered = false;
      }
      else {
        this.isfiltered = true;
      }
    }
    else {
      alert("Enter a valid range");
      const element = document.getElementById("ToPrice");
      if (element !== null) {
        // element is not null, so it's safe to use
        element.focus();
      }
      // document.getElementById("ToPrice").focus();
      this.isfiltered = false;
    }
  }

  resetFilterPage() {
    this.filteredItems = [];
    this.isfiltered = false;
  }

  resetSearchPage() {
    this.searchBar = '';
    this.searchedItems = [];
    this.isSearched = false;
  }

  searchItems() {
    this.searchedItems = [];
    if (this.searchBar != '') {
      this.isSearched = true;
      for (let item of this.allItems) {
        let temp: string = item.itemName;
        temp = temp.toLowerCase();
        if (temp.includes(this.searchBar.toLowerCase())) {
          this.searchedItems.push(item);
        }

      }

      if (this.searchedItems.length == 0) {
        this.isSearched = false;
        const element = document.getElementById("searchBar");
        if (element !== null) {
          // element is not null, so it's safe to use
          element.focus();
        }
        // document.getElementById("searchBar").focus();
      }
      else {
        this.isSearched = true;
      }

    }
    else {
      const element = document.getElementById("searchBar");
      if (element !== null) {
        // element is not null, so it's safe to use
        element.focus();
      }
      // document.getElementById("searchBar").focus();
      this.searchedItems = [];
      this.isSearched = false;

    }

  }
}
