import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatListOption, MatSelectionListChange } from '@angular/material/list';
import { MatSlider, MatSliderChange } from '@angular/material/slider';
import { __values } from 'tslib';
import { Product, ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],

})
export class CartComponent {

  form: FormGroup;

  constructor(
    fb: FormBuilder,
    public service: ShoppingService
  ) {
    this.form = fb.group({
     selectedProducts:  new FormArray([])
    });
  }

  public categories = [
      { id: 0, key: 'new', value: 'New Arivals' },
      { id: 1, key: 'accessories', value: 'Accesories' },
      { id: 2, key: 'bags', value: 'Bags' },
      { id: 3, key: 'dressed', value: 'Dressed' },
      { id: 4, key: 'jackets', value: 'Jackets' },
      { id: 5, key: 'jewelry', value: 'jewelry' },
      { id: 6, key: 'shoes', value: 'Shoes' },
      { id: 7, key: 'shirts', value: 'Shirts' },
      { id: 8, key: 'sweaters', value: 'Sweaters' },
      { id: 9, key: 'tshirts', value: 'T-shirts' },
  ];

  onSelectionChange(event: MatSelectionListChange): void {
    const selectedCategories = event.source.selectedOptions.selected.map((option: MatListOption) => option.value);
    this.service.setCategoryFilter(selectedCategories);
  }

  submit() {
  }

  public colors = [
    { id: 0, key: 'beige' ,value: '#dcdcc6', name: 'Beige'},
    { id: 1, key: 'black' , value: '#222', name: 'Black' },
    { id: 2, key: 'blue' , value: '#6e8cd5', name: 'Blue' },
    { id: 3, key: 'brown' , value: '#f56060', name: 'Brown' },
    { id: 4, key: 'green' , value: '#44c28d', name: 'Green' },
    { id: 5, key: 'grey' , value: '#999', name: 'Grey' },
    { id: 6, key: 'orange' , value: '#f79858', name: 'Orange' },
    { id: 7, key: 'purple' , value: '#b27ef8', name: 'Purple' },
    { id: 8, key: 'red' , value: '#f56060', name: 'Red' },
    { id: 9, key: 'white' , value: '#fff', name: 'White', border: '1px solid #e8e9eb' },
  ];

  clickColor(key: String): void {
    const newSelectedColors = [...this.service.colorFilter];
    if (newSelectedColors.includes(key)) {
      newSelectedColors.splice(newSelectedColors.indexOf(key), 1);
    } else {
      newSelectedColors.push(key);
    }
    this.service.setColorFilter(newSelectedColors);
  }

  public sizes = [
    { id: 0, key: 'xs', value: 'XS'},
    { id: 1, key: 's', value: 'S'},
    { id: 2, key: 'm', value: 'M'},
    { id: 3, key: 'l', value: 'L'},
    { id: 4, key: 'xl', value: 'XL'},
    { id: 5, key: 'xxl', value: 'XXL'},
  ];

  onSelectionSizeChange(event: MatSelectionListChange): void {
    const selectedSizes = event.source.selectedOptions.selected.map((option: MatListOption) => option.value);
    this.service.setSizeFilter(selectedSizes);
  }

  formatLabel(value: number) {
    if (value >= 1) {
      return Math.round(value / 1) + '€';
    }
    return value;
  }

  onSelectionPriceChange(event: MatSliderChange): void {
    this.service.setPriceFilter(event.value ?? 900);
  }

  clearCartItem(cartItems: Product) {
    this.service.clearCartItem(cartItems);
  }
}
