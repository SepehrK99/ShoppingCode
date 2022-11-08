import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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

  isLogin: boolean = false
  errorMessage: any

  ngOnInit() {
    this.isUserLogin();
  }

  onSubmit(form: NgForm) {
    this.signin.postTypeRequest('login', form.value).subscribe((res: any) => {
      if (res.status) {
        this.signin.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this.signin.setDataInLocalStorage('token', res.token);
        this.route.navigate(['login']);
      } else {
        alert(res.msg)
      }
    });
  }

  isUserLogin(){
    console.log(this.signin.getUserDetails() );

    if(this.signin.getUserDetails() != null){
        this.isLogin = true;
    }
  }

}
