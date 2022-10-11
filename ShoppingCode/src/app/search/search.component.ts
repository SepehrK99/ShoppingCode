import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { // Open the full screen search box

  }

  ngOnInit(): void {
  }

  closeSearch() {
    document.getElementById("myOverlay")!.style.display = "none";
  }

}
