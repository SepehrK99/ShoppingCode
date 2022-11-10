import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class Message {
  name: String = '';
  email: String = '';
  message: String = '';
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  shoppingUrl = '/api/'

  constructor(private http: HttpClient) {}

  public postMessage(message: Message){
    this.http.post(`${this.shoppingUrl}message`, message)
    .subscribe(data =>{
    });
  }
}
