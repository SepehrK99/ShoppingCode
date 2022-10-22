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
  }
  closeLogin() {
    this.isLoginOpen = false;
  }
}
