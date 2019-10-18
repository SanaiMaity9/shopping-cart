import { Component, OnInit } from '@angular/core';

import { ItemsService }  from '../item/items.service';
import { Item } from '../item/item';
import { ModalService } from '../_modal';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  
  cartArray: Item[];
  total: number = 0;

  constructor(private itemsService: ItemsService, private modalService: ModalService) { }

  ngOnInit() {
    this.getCartList();
  }

  getCartList() :void{
    this.itemsService.getCartList()
     .subscribe(cartArray => {
       this.cartArray = cartArray;
    })
  }

  checkout(){
    this.total = 0;
    for(var i=0; i < this.cartArray.length; i++){
      var tempTotal = this.cartArray[i].Price * this.cartArray[i].Quantity;
      this.total = this.total + tempTotal;
    }
    this.modalService.open("custom-modal-1");
  }

  addQuantity(item, i) {
    if (item.Quantity >= 0) {
      this.cartArray[i].Quantity = this.cartArray[i].Quantity + 1;
      this.modalService.open("custom-modal-3");
    }
   }

  minusQuantity(item, i) {
    if (item.Quantity > 0) {
     this.cartArray[i].Quantity = this.cartArray[i].Quantity - 1;
     if(this.cartArray[i].Quantity == 0){
      this.cartArray.splice(i, 1);
      this.modalService.open("custom-modal-2");
     }
    }
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }
}
