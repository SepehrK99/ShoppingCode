import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SigninService } from '../signin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isSearchOpen = false;

  public isLoginOpen = false;

  public isSignupOpen = false;

  public isLoggedIn = false;

  constructor(
    private route:Router,
    public signin: SigninService
  ){}

  go(){
  this.route.navigate(['/page']);
	}

  goPlaces() {
  this.route.navigate(['/', 'page-name']);
  }

  ngOnInit(): void {
    this.signin.isUserLogin();
    this.isLoggedIn = this.signin.isUserLoggedIn;
  }

  openSearch() {
    this.isSearchOpen = true;
  }
  closeSearch() {
    this.isSearchOpen = false;
  }

  openLogin() {
    this.isSignupOpen = false;
    this.isLoginOpen = true;
    this.signin.isUserLogin();
  }

  closeLogin() {
    this.isLoginOpen = false;
    this.signin.isUserLogin();
  }

  openSignup() {
    this.isSignupOpen = true;
    this.isLoginOpen =false;
    this.signin.isUserLogin();
  }

  closeSignup() {
    this.isSignupOpen = false;
    this.signin.isUserLogin();
  }
}
