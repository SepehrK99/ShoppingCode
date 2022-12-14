import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Product, ShoppingService } from '../shopping.service';
import { SigninService } from '../signin.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public user: any;

  constructor(
    public service: ShoppingService,
    public signin: SigninService,
    ) {}

  ngOnInit(): void {
    this.signin.getTypeRequest('profile').subscribe((res: any) => {
      this.signin.setDataInLocalStorage('userData', JSON.stringify(res));
      this.user = res
      console.log('USER', this.user);
    });
  }

  clearCartItem(cartItems: Product) {
    this.service.clearCartItem(cartItems);
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    form.value['products'] = this.service.cartItems;
    this.signin.postTypeRequest('order', form.value).pipe(catchError((error: HttpErrorResponse) => {
      console.log('ERR', error);
      return throwError(() => new Error('Something bad happened; please try again later.'));
    })).subscribe((res: any) => {
      console.log('RES', res);
    });
  }
}
