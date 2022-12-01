import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SigninService } from '../signin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() close = new EventEmitter<void>();

  @Output() openSignup = new EventEmitter<void>();

  public protectedData: any;

  ngOnInit(): void {
    this.signin.isUserLogin();
  }

  constructor(
    private route:Router,
    public signin: SigninService,
  ) {}

  go(){
  this.route.navigate(['/page']); // navigate to other page
	}

  goPlaces() {
  this.route.navigate(['/', 'page-name']);
  }

  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);
    this.signin.postTypeRequest('login', form.value).pipe(catchError((error: HttpErrorResponse) => {
      console.log('ERR', error);
      return throwError(() => new Error('Something bad happened; please try again later.'));
    })).subscribe((res: any) => {
      console.log('RES', res);
      if (res) {
        this.signin.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this.signin.setDataInLocalStorage('token', res.token);
        this.signin.isUserLogin();
        this.route.navigate(['profile']);
      } else {
        alert(res.msg);
      }
    });
  }
}
