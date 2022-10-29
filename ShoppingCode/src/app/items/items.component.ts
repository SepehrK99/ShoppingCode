import { Component, OnInit } from '@angular/core';
import { Product, ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  public items: Product[] = [];

  constructor(private service: ShoppingService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.service.getProducts().subscribe((data: Product[]) => {
      this.items = data;
    })
  }
}
