import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { StartComponent } from './components/start/start.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemListComponent } from './components/item/item-list/item-list.component';
import { ItemDisplayComponent } from './components/item/item-display/item-display.component';
import { SellerAddItemComponent } from './components/item/seller-add-item/seller-add-item.component';
import { SellerItemsComponent } from './components/item/seller-items/seller-items.component';
import { EmartService } from './services/emart.service';

import { HttpClientModule } from '@angular/common/http';
import { CartListComponent } from './components/cart/cart-list/cart-list.component';
import { BillListComponent } from './components/bill/bill-list/bill-list.component';
import { BillViewComponent } from './components/bill/bill-view/bill-view.component';
@NgModule({
  declarations: [
    AppComponent,
    TransferComponent,
    StartComponent,
    HeaderComponent,
    FooterComponent,
    ItemListComponent,
    ItemDisplayComponent,
    SellerAddItemComponent,
    SellerItemsComponent,
    CartListComponent,
    BillListComponent,
    BillViewComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    HttpClientModule
  ],
  providers: [EmartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
