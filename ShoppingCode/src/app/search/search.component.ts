import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  public search: string = '';

  constructor(public service: ShoppingService) {
    this.search = service.search;
  }

  ngOnInit(): void {
  }

  getSearch(): void {
    console.log('SETTING SEARCH', this.search);
    this.service.setSearch(this.search);
  }
}
