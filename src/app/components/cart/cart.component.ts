import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartData:any[] = [];
  totalPrice:number = 0;
  placed :string=" ";
  

  constructor(
    private sharedService: SharedService,
    private changeRef: ChangeDetectorRef
    ) {
      this.sharedService.getCartProducts().subscribe(res => {
        debugger
        this.cartData = JSON.parse(JSON.stringify(res));
        this.getTotalPrice();
      });
     }

  ngOnInit(): void {

  }

  updateQuantity(operation, item, index) {
    switch (operation) {
      case 'increase':
          item['quantity'] += 1;
          this.sharedService.updateCartData(item , index);
        break;
      case 'decrease':
        if(item['quantity'] == 1) return;

        item['quantity'] -= 1;
        this.sharedService.updateCartData(item , index);
        break;
    }
  }

  getTotalPrice() {
    this.totalPrice = 0;
      this.cartData.forEach(res => {
        this.totalPrice += (res.price * res.quantity);

      });
  }
  

  addCoupon(Coupon: string) {
    if (Coupon=='OSOS30') { 
      this.totalPrice = this.totalPrice - (this.totalPrice*0.30);
    }
  }

  orderPlaced(){
    if(this.totalPrice==0){
      this.placed ="Your Cart is Empty";
    }
    else{
    this.placed ="Your Order is Placed Thank You";
    }
  }

}
