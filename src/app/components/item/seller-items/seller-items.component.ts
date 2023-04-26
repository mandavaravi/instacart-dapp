import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmartService } from 'src/app/services/emart.service';

@Component({
  selector: 'app-seller-items',
  templateUrl: './seller-items.component.html',
  styleUrls: ['./seller-items.component.css']
})
export class SellerItemsComponent implements OnInit {
  allItems: any;
  constructor(protected emartService: EmartService, protected router: Router) { }

  ngOnInit(): void {

    if(JSON.parse(localStorage.getItem("currentSeller")+"").sellerId != 0){
      this.emartService.getAllSelleritems(JSON.parse(localStorage.getItem("currentSeller")+"").sellerId).subscribe((response)=> 
        {
          this.allItems = response;
        }
      );
    }
    else{
      this.router.navigate(['/']);
    }

  }

  addItem(){
    this.router.navigate(['/seller-add-item']);
  }

  viewItem(itemId: number){

  }

  editItem(itemId: number){

  }
}
