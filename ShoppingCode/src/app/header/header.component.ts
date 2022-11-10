import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isSearchOpen = false;

  public isLoginOpen = false;

  public isSignupOpen = false;

  public isUserLogin = false;

  constructor(private route:Router){}

  go(){
  this.route.navigate(['/page']); // navigate to other page
	}

  goPlaces() {
  this.route.navigate(['/', 'page-name']);
  }

  ngOnInit(): void {

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
    this.isLoginOpen = true;
    this.isSignupOpen = false;
  }
  closeLogin() {
    this.isLoginOpen = false;
  }

  openSignup() {
    this.isSignupOpen = true;
    this.isLoginOpen =false;
  }

  closeSignup() {
    this.isSignupOpen = false;
    this.isUserLogin = true;
  }
}
