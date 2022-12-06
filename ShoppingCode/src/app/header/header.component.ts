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
  this.route.navigate(['/page']); // navigate to other page
	}

  goPlaces() {
  this.route.navigate(['/', 'page-name']);
  }

  ngOnInit(): void {
    this.signin.isUserLogin();
    this.isLoggedIn = this.signin.isUserLoggedIn;
  }

  openSearch() {
    //document.getElementById("myOverlay")!.style.display = "block";
    this.isSearchOpen = true;
  }
  closeSearch() {
    this.isSearchOpen = false;
  }

  openLogin() {
    //document.getElementById("myOverlay")!.style.display = "block";
    this.isSignupOpen = false;
    this.isLoginOpen = true;
    console.log(this.isSignupOpen);
    console.log(this.isLoginOpen);
    console.log(this.signin.isUserLoggedIn);
    console.log("OPEN LOGIN METHOD");
    this.signin.isUserLogin();
  }

  closeLogin() {
    this.isLoginOpen = false;
    console.log(this.isSignupOpen);
    console.log(this.isLoginOpen);
    console.log(this.signin.isUserLoggedIn);
    console.log("CLOSE LOGIN METHOD");
    this.signin.isUserLogin();
  }

  openSignup() {
    this.isSignupOpen = true;
    this.isLoginOpen =false;
    console.log(this.isSignupOpen);
    console.log(this.isLoginOpen);
    console.log(this.signin.isUserLoggedIn);
    console.log("OPEN SIGNUP METHOD");
    this.signin.isUserLogin();
  }

  closeSignup() {
    this.isSignupOpen = false;
    // TODO isUserLogin muss von wo anders auf true gesetzt werden
    console.log(this.isSignupOpen);
    console.log(this.isLoginOpen);
    console.log(this.signin.isUserLoggedIn);
    console.log("CLOSE SIGNUP METHOD");
    this.signin.isUserLogin();
  }
}
