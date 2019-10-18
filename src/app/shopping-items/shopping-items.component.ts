import { Component, OnInit } from '@angular/core';
 
 import { ItemsService } from '../item/items.service'
 import { Item } from '../item/item';
 import { ModalService } from '../_modal';
 
 @Component({
  selector: 'app-shopping-items',
  templateUrl: './shopping-items.component.html',
  styleUrls: ['./shopping-items.component.css']
 })
 export class ShoppingItemsComponent implements OnInit {
  items: Item[];
  filterData: Item[];
 
  constructor(private itemsService: ItemsService, private modalService: ModalService) {}
 
  getItems(): void {
   this.itemsService.getItems()
    .then(list => {
      this.items = list;
      this.itemsService.getCartList()
      .subscribe(cartArray => {
        if(cartArray.length > 0){
          for (var i=0; i < cartArray.length; i++) {
            this.filterData = this.items.filter(item => item.Id === cartArray[i].Id);
            var index = this.items.indexOf(this.filterData[0]);
            if(index >= 0){
              this.items[index].Quantity = cartArray[i].Quantity;
            }
           }
        }
      });
     },
     error => {
      console.error('An error occurred in retrieving shopping list, navigating to login: ', error);
     });
  }
 
  ngOnInit() {
    this.getItems();
  }
 
  addToCart(item) {
   this.itemsService.addToCart(item);
  }
 
  addQuantity(item) {
   if (item.Quantity >= 0) {
    item.Quantity = item.Quantity + 1;
   }
  }
 
  minusQuantity(item) {
   if (item.Quantity > 0) {
    item.Quantity = item.Quantity - 1;
   }
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }
 }