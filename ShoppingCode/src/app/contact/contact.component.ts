import { Component, OnInit } from '@angular/core';
import { Message, ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  message = new Message();

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
  }

  postMessage(){
    this.shoppingService.postMessage(this.message);
  }
}
