import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  prodcts = new BehaviorSubject<any>([
    {
      id: 1,
      name : 'ASIAN Men Running Shoes',
      price : 1329.00,
      description : 'New, Breathable knitted upper which is easily washable, perfect for all seasons - winter, summer and rainy, designed to give you the most comfortable fitting. These are quick drying washable shoes which makes it easy for consumers to wash and sanitize them easily.',
      imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81QnGdrGwsL._UL1500_.jpg'
    },
    {
      id: 2,
      name : 'Tryme Fashion Men Regular Fit Casual Shirt',
      price : 699.00,
      description : 'Red and black checked casual shirt, has a spread collar, button placket, 1 pocket, long sleeves, curved hem',
      imageUrl: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2414313/2018/3/13/11520926368495-HERENOW-Men-Red--Black-Regular-Fit-Checked-Casual-Shirt-8881520926368447-3.jpg'
    },
    {
      id: 3,
      name : 'Espoir ES2615 Day And Date Functioning High Quality Analog Watch - For Men',
      price : 312,
      description : 'Worlds one of the best Japanese movement and Japanese battery helps to run the watch for years & years. Crafted from a rich quality material, this watch for men is light in weight and long lasting too. Espoir known for its edgy and affordable range of watches.You can show it off with your casual & formal attires to grab compliments from everyone around',
      imageUrl: 'https://rukminim1.flixcart.com/image/880/1056/k4ohqq80/watch/v/5/d/es2615-espoir-original-imafnj6shv5bpxxh.jpeg?q=50'
    }
  ]);

  shoppingCart = new BehaviorSubject<any>([]);
  
  getAllproducts() {
    return this.prodcts.asObservable();
  }

  getCartProducts() {
    return this.shoppingCart.asObservable();
  }

  addTocart(data) {
    data['quantity'] = 1;
    let availableCartData = this.shoppingCart.value;
    availableCartData.push(data);
    this.shoppingCart.next(availableCartData);
  }

  updateCartData(data, index) {
    let availableCartData = JSON.parse(JSON.stringify(this.shoppingCart.value)) as any;
   
    availableCartData[index] = data;

    this.shoppingCart.next(availableCartData); 
  }

  removeCartData(data, index) {
    let availableCartData = this.shoppingCart.value[index];
    availableCartData.splice(index, 1);
    this.shoppingCart.next(availableCartData);
  }
}
