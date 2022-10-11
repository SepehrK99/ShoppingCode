import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  openSearch() {
    document.getElementById("myOverlay")!.style.display = "block";
  }
  openLogin() {
    document.getElementById("displayNone")!.style.display = "block";
  }


}
