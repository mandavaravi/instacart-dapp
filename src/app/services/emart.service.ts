import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmartService {

  cartItems: any;
  allBills: any ;
  currentBuyer : any = null;
  currentSeller : any = null;
  allItems: any;
  
  constructor(protected http: HttpClient) { 
    this.cartItems = [];
    this.allBills = [];
  }

  /*
  * ******************************************************************************************* ******************************************************************************************
  * ******************************************************************************************* ******************************************************************************************
  * ******************************************************************************************* ******************************************************************************************
  */

  getAllSelleritems(sellerId: number){
    return this.http.get('http://localhost:8083/ItemService/itemservice/selleritems/all/'+sellerId);
  }

  addItem(item : any){
    return this.http.post('http://localhost:8083/ItemService/itemservice/additem', item);
  }

  
  getAllItems():any{
    return this.http.get('/assets/data.json');
  }

  setLocalItems(itemsList: any) {
    this.allItems = itemsList;
    console.log(this.allItems);
  }
  
  getItem(itemId: string):any{
    for(let i=0; i<this.allItems.length; i++) {
      if(itemId == this.allItems[i]['itemId']){
        return this.allItems[i];
      }
    }
  }

  // // // // // // // // // // 
  getAllCategories(){
    return this.http.get('http://localhost:8083/ItemService/itemservice/category/all');
  }

  getSubCategories(categoryId : any){
    return this.http.get('http://localhost:8083/ItemService/itemservice/subcategory/'+categoryId);
  }
  // // // // // // // // // // 

  /*
  * ******************************************************************************************* ******************************************************************************************
  * ******************************************************************************************* ******************************************************************************************
  * ******************************************************************************************* ******************************************************************************************
  */

  setAllBills(billsList: any){
    this.allBills = billsList;
  }

  getAllBillsService(){
    return this.allBills;
  }
  
  getAllBills(buyerId: number):any{
    return this.http.get('http://localhost:8083/ItemService/itemservice/allBills/'+buyerId);
  }

  addBill( todayDate: Date, total: number){
    let allBillDetails: any = [];
    for(let i=0;i<this.cartItems.length; i++){
        allBillDetails.push({
          billDetailsId : 0,
          bill : null,
          item : this.cartItems[i]
        });
    }

    let bill: any = {
      billId: 0,
      billType : 'Credit',
      billDate : todayDate,
      billRemarks : 'Paid',
      billAmount : total,
      buyer: {
        buyerId : this.getCurrentBuyer().buyerId
      },
      allBillDetails : allBillDetails
    }
    this.cartItems = [];
    allBillDetails = [];
    return this.http.post("http://localhost:8083/ItemService/itemservice/addBill", bill);
  }


  /*
  * ******************************************************************************************* ******************************************************************************************
  * ******************************************************************************************* ******************************************************************************************
  * ******************************************************************************************* ******************************************************************************************
  */


  addToCart(itemObj: any){
   this.cartItems.push(itemObj);
   let tempObj : any;
   this.http.get('/assets/data.json').subscribe(result => {
    console.log(result);
    tempObj = result;
  });
  //  this.http.put('/assets/data.json', it).subscribe(result => {
  //   console.log(result);
  // });
  }

  getAllCart(){
    return [].concat(this.cartItems);
  }

  setAllCart(cartItems: any){
    this.cartItems = cartItems;
  }

  deleteCartItem(itemNo: number){
    let size = this.cartItems.length;
    for(let i=0;i<size;i++){
      if(this.cartItems[i].itemId==itemNo){
        this.cartItems.splice(i,1);
        break;
      }
    }
    return [].concat(this.cartItems);
  }

  
  /*
  * ******************************************************************************************* ******************************************************************************************
  * ******************************************************************************************* ******************************************************************************************
  * ******************************************************************************************* ******************************************************************************************
  */
  setBuyer(currentBuyer: any) {
    this.currentBuyer = currentBuyer;
  }
  setSeller(currentSeller : any){
    this.currentSeller = currentSeller;
  }

  getCurrentBuyer(){
    return this.currentBuyer;
  }

  getCurrentSeller(){
    return this.currentSeller;
  }

  addBuyer(buyer: any){
    return this.http.post('http://localhost:8083/LoginService/login/add', buyer);
  }

  validateBuyer(user: string, password: string){

    let uData = user + ":" + password;
    let headers  = new HttpHeaders();
    headers  =  headers.set('Authorization', uData);
    return this.http.get('http://localhost:8083/LoginService/login/validate', {headers});
  }

  
  addSeller(seller: any){
    return this.http.post('http://localhost:8083/LoginService/sellerlogin/add', seller);
  }

  validateSeller(user: string, password: string){

    let uData = user + ":" + password;
    let headers  = new HttpHeaders();
    headers  =  headers.set('Authorization', uData);
    return this.http.get('http://localhost:8083/LoginService/sellerlogin/validate', {headers});
  }


  /*
  * ******************************************************************************************* ******************************************************************************************
  * ******************************************************************************************* ******************************************************************************************
  * ******************************************************************************************* ******************************************************************************************
  */
}
