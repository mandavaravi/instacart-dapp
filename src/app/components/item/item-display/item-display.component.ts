import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmartService } from 'src/app/services/emart.service';


@Component({
  selector: 'app-item-display',
  templateUrl: './item-display.component.html',
  styleUrls: ['./item-display.component.css']
})
export class ItemDisplayComponent implements OnInit {

  item: any;

  constructor(protected activatedRoute: ActivatedRoute,
    protected emartService: EmartService,
    protected router: Router) { }

  ngOnInit(): void {


    // if (JSON.parse(localStorage.getItem("currentBuyer")+ "").buyerId != 0) {
      alert('Items dis :');

      this.activatedRoute.paramMap.subscribe(
        (param) => {
          let id = param.get('iId');
          this.item = this.emartService.getItem(id+"");
          // .subscribe((response: any) => {
          //   this.item = response;
          // }
          // );
        }
      );
    // }
    // else {
    //   this.router.navigate(['/']);
    // }
  }

  addToCart(item: any) {
    this.emartService.addToCart(item);
    this.router.navigate(['item-list']);
  }

}
