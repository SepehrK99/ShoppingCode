import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  closeLogin() {
    document.getElementById("displayNone")!.style.display = "none";
  }

  openGoogle() {
    document.getElementById("openGoogle")!.style.display = "block";
  }
}
