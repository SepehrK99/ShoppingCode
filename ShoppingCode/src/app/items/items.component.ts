import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  constructor(
    public service: ShoppingService,
    private route:Router
    ) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.service.loadProducts();
  }

  go(){
    this.route.navigate(['/page']);
  }

  goPlaces() {
    this.route.navigate(['/', 'page-name']);
  }

  addToCart(product: Product) {
    this.service.addToCart(product);
  }
}
