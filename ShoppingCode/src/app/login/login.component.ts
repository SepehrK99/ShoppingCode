import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninService } from '../signin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() close = new EventEmitter<void>();

  @Output() openSignup = new EventEmitter<void>();

  public isLogin = false;
  errorMessage: any
  public protectedData: any
  public loading: boolean = false

  ngOnInit(): void {
    this.signin.getTypeRequest('login').subscribe((res: any) => {
      this.protectedData = res
    });

    this.isUserLogin();
  }

  constructor(
    private route:Router,
    private signin: SigninService,
    ){}

  go(){
  this.route.navigate(['/page']); // navigate to other page
	}

  goPlaces() {
  this.route.navigate(['/', 'page-name']);
  }

  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);
    this.signin.postTypeRequest('api/login', form.value).subscribe((res: any) => {

      if (res.status) {

        this.signin.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this.signin.setDataInLocalStorage('token', res.token);
        this.route.navigate(['']);
      }
    })
  }
  isUserLogin(){
    if(this.signin.getUserDetails() != null){
        this.isLogin = true;
    }
  }
  logout(){
    this.signin.clearStorage()
    this.route.navigate(['']);
  }
}
