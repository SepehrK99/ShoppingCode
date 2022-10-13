import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isSearchOpen = false;

  constructor() { }

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
    document.getElementById("displayNone")!.style.display = "block";
  }


}
