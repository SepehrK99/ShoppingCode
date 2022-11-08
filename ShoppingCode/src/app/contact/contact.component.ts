import { Component, OnInit } from '@angular/core';
import {ShoppingService } from '../shopping.service';
import { Message, } from '../message.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  message = new Message();
  messageService: any;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
  }

  postMessage(){
    this.messageService.postMessage(this.message);
  }
}
