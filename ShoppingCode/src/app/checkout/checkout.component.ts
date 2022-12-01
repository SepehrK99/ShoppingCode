import { Component, OnInit } from '@angular/core';
import { Product, ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(
    public service: ShoppingService
    ) {}

  ngOnInit(): void {
  }

  clearCartItem(cartItems: Product) {
    this.service.clearCartItem(cartItems);
  }
}
