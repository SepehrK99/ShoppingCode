import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

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
