import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  @Output() close = new EventEmitter<void>();

  constructor(private route:Router) { }

  go(){
    this.route.navigate(['/page']); // navigate to other page
  }

  goPlaces() {
  this.route.navigate(['/', 'page-name']);
  }

  ngOnInit(): void {
  }

}
