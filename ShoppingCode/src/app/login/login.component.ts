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
  this.route.navigate(['/page']);
	}

  goPlaces() {
  this.route.navigate(['/', 'page-name']);
  }

  onSubmit(form: NgForm) {
    this.signin.postTypeRequest('login', form.value).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(() => new Error('Something bad happened; please try again later.'));
    })).subscribe((res: any) => {
      if (res) {
        this.signin.setDataInLocalStorage('token', res.token);
        this.signin.getTypeRequest('profile').subscribe((res: any) => {
          this.signin.setDataInLocalStorage('userData', JSON.stringify(res));
          this.signin.isUserLogin();
          this.route.navigate(['profile']);
          this.close.emit();
        });
      } else {
        alert(res.msg);
      }
    });
  }
}
