import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SigninService } from '../signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  @Output() close = new EventEmitter<void>();

  constructor(
    private route:Router,
    private signin: SigninService,
  ) { }

  go(){
    this.route.navigate(['/page']); // navigate to other page
  }

  goPlaces() {
  this.route.navigate(['/', 'page-name']);
  }

  public isLogin = false;
  public protectedData: any;

  ngOnInit() {

    this.isUserLogin();
  }

  onSubmit(form: NgForm) {

    this.signin.postTypeRequest('register', form.value).pipe(catchError((error: HttpErrorResponse) => {
      console.log('ERR', error);
      return throwError(() => new Error('Something bad happened; please try again later.'));
    })).subscribe((res: any) => {
      console.log('RES', res);
      if (res) {
        this.signin.setDataInLocalStorage('userData', JSON.stringify(res.userData));
        this.signin.setDataInLocalStorage('token', res.token);
        this.route.navigate(['profile']);
      } else {
        alert(res.msg);
      }
    });
  }

  isUserLogin(){
    console.log(this.signin.getUserDetails() != null);

    if(this.signin.getUserDetails() != null){
        this.isLogin = true;
    }
  }

}
