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

  public user: any = {};
  public isLoginOpen = false;
  public isSignupOpen = false;

  constructor(
    public service: ShoppingService,
    public signin: SigninService,
  ) {}

  ngOnInit(): void {
    this.signin.getTypeRequest('profile').subscribe((res: any) => {
      this.signin.setDataInLocalStorage('userData', JSON.stringify(res));
      this.user = res
    });
  }

  clearCartItem(cartItems: Product) {
    this.service.clearCartItem(cartItems);
  }

  onSubmit(form: NgForm){
    form.value['products'] = this.service.cartItems;
    this.signin.postTypeRequest('order', form.value).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(() => new Error('Something bad happened; please try again later.'));
    })).subscribe((res: any) => {
    });
  }

  openLogin() {
    this.isLoginOpen = true;
    this.signin.isUserLogin();
  }
}
