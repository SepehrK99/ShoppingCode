import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  constructor() { // Open the full screen search box

  }

  ngOnInit(): void {
  }

  // closeSearch() {
  //   // document.getElementById("myOverlay")!.style.display = "none";
  // }

}
