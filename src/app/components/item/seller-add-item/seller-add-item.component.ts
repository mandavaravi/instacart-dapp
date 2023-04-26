import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmartService } from 'src/app/services/emart.service';


@Component({
  selector: 'app-seller-add-item',
  templateUrl: './seller-add-item.component.html',
  styleUrls: ['./seller-add-item.component.css']
})
export class SellerAddItemComponent implements OnInit {

  rName = '';
  rImage = '';
  rPrice : number = 0;
  rStock : number = 0;
  rDescription = '';
  rSubCategory : any = null;
  rCategory: any = null;
  rRemarks = '';
  clist : any = [];
  sclist : any = [];


  constructor(protected router: Router, protected emartService: EmartService) { }

  ngOnInit(): void {

    alert('Add Item start :');
    if(JSON.parse(localStorage.getItem("currentSeller")+"").sellerId != 0){
      this.emartService.getAllCategories().subscribe
      (
        (res) => {
        this.clist = res;
      })
    }
    else{
      this.router.navigate(['/']);
    }

  }

  addItem(){
    let subcat : any;
    for(let i of this.sclist){
      if(this.rSubCategory == i.subCategoryId){
        subcat  = i;
        break;
      }
    }
    let item: any = {
      itemId : 0,
      itemName : this.rName,
      itemImage : this.rImage,
      itemPrice : this.rPrice,
      itemDescription : this.rDescription,
      itemRemarks : this.rRemarks,
      itemStock : this.rStock,
      subCategory : subcat,
      seller : {sellerId : JSON.parse(localStorage.getItem("currentSeller")+"").sellerId}
    };
    
    return this.emartService.addItem(item).subscribe
    (
      (res) => {
      item = res;
      this.router.navigate(['/seller-items']);
    });

  }
  

  GetSubCategory(categoryId: any){
    this.emartService.getSubCategories(categoryId).subscribe
    (
      (res) => {
      this.sclist = res;
    });
  }
}
