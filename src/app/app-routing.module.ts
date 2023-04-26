import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './components/start/start.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { SellerItemsComponent } from './components/item/seller-items/seller-items.component';
import { SellerAddItemComponent } from './components/item/seller-add-item/seller-add-item.component';
import { ItemDisplayComponent } from './components/item/item-display/item-display.component';
import { ItemListComponent } from './components/item/item-list/item-list.component';
import { CartListComponent } from './components/cart/cart-list/cart-list.component';
import { BillViewComponent } from './components/bill/bill-view/bill-view.component';
import { BillListComponent } from './components/bill/bill-list/bill-list.component';

const routes: Routes = [
    { path: '', redirectTo: '/start', pathMatch: 'full' },
    { path: 'start', component: StartComponent },
    { path: 'transfer', component: TransferComponent },
    {
        path: 'seller-items',
        component: SellerItemsComponent
    },
    {
        path: 'seller-add-item',
        component: SellerAddItemComponent
    },
    {
        path: 'item-display/:iId',
        component: ItemDisplayComponent
    },
    {
        path: 'item-list',
        component: ItemListComponent
    },
    // {
    //     path: '',
    //     component: LoginComponent
    // },
    // {
    //     path: 'log-out',
    //     component: LogoutComponent
    // },
    {
        path: 'cart-list',
        component: CartListComponent
    },
    {
        path: 'bill-view',
        component: BillViewComponent
    },
    {
        path: 'bill-list',
        component: BillListComponent
    },
    // {
    //     path: 'buyer-signup',
    //     component: BuyerSignupComponent
    // },
    // {
    //     path: 'seller-signup',
    //     component: SellerSignupComponent
    // }

];

@NgModule({
    imports: [RouterModule.forRoot(routes), CommonModule],
    exports: [RouterModule]
})

export class AppRoutingModule { }