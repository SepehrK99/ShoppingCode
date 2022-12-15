import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ShoppingService } from '../shopping.service';
import { SigninService } from '../signin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: any
  public loading: boolean = false
  public userHistory: any
  public sum: any;
  public count: any;

  @Output() close = new EventEmitter<void>();

  constructor(
    private route:Router,
    public signin: SigninService,
    public service: ShoppingService,
  ) {}

  ngOnInit(): void {
    this.signin.getTypeRequest('profile').subscribe((res: any) => {
      this.signin.setDataInLocalStorage('userData', JSON.stringify(res));
      this.user = res
    });

    this.signin.postTypeRequest('order-history', localStorage.getItem('userData')).subscribe((res: any) => {
      this.signin.setDataInLocalStorage('userData', JSON.stringify(res));
      this.userHistory = res
      this.getTotalPrice();
      this.getTotalCount();
    });
  }

  logout(){
    this.signin.clearStorage();
    this.signin.isUserLogin();
    this.route.navigate(['']);
    this.close.emit();
  }

  onSubmit(form: NgForm){
    this.signin.postTypeRequest('profile', form.value).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(() => new Error('Something bad happened; please try again later.'));
    })).subscribe((res: any) => {
    });
  }

  getTotalPrice() {
    var sum = 0;
    for (let index = 0; index < this.userHistory.length; index++) {
      for (let j = 0; j < this.userHistory[index].data.products.length; j++) {
        sum += this.userHistory[index].data.products[j].price;
      }
    }
    this.sum = sum;
  }

  getTotalCount() {
    var count = 0;
    for (let index = 0; index < this.userHistory.length; index++) {
      for (let j = 0; j < this.userHistory[index].data.products.length; j++) {
        count += this.userHistory[index].data.products[j].count;
      }
    }
    this.count = count;
  }
}
