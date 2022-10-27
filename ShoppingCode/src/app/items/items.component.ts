import { Component, OnInit } from '@angular/core';
import { ItemsService, Product } from '../items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  public items: Product[] = [];

  constructor(private service: ItemsService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.service.getProducts().subscribe((data: Product[]) => {
      this.items = data;
    })
  }
}
