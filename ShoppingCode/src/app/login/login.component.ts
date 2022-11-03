import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() close = new EventEmitter<void>();

  @Output() openSignup = new EventEmitter<void>();

  constructor(private route:Router){}

  go(){
  this.route.navigate(['/page']); // navigate to other page
	}

  goPlaces() {
  this.route.navigate(['/', 'page-name']);
  }

  ngOnInit(): void {
  }

}
