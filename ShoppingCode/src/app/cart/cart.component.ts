import { Component,} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatListOption, MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],

})
export class CartComponent{
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
     selectedProducts:  new FormArray([])
    });
  }

  public categories = [
      { id: 0, value: 'New Arivals' },
      { id: 1, value: 'Accesories' },
      { id: 2, value: 'Bags' },
      { id: 3, value: 'Dressed' },
      { id: 4, value: 'Jackets' },
      { id: 5, value: 'jewelry' },
      { id: 6, value: 'Shoes' },
      { id: 7, value: 'Shirts' },
      { id: 8, value: 'Sweaters' },
      { id: 9, value: 'T-shirts' },
  ];

  selectedCategories: number[] = JSON.parse(localStorage.getItem('selected') || '[]');
  onSelectionChange(event: MatSelectionListChange): void {
    this.selectedCategories = event.source.selectedOptions.selected.map((option: MatListOption) => option.value);
  }

  submit() {
    console.log(this.form.value);
  }

  public colors = [
    { id: 0, value: '#dcdcc6', name: 'Beige'},
    { id: 1, value: '#222', name: 'Black' },
    { id: 2, value: '#6e8cd5', name: 'Blue' },
    { id: 3, value: '#f56060', name: 'Brown' },
    { id: 4, value: '#44c28d', name: 'Green' },
    { id: 5, value: '#999', name: 'Grey' },
    { id: 6, value: '#f79858', name: 'Orange' },
    { id: 7, value: '#b27ef8', name: 'Purple' },
    { id: 8, value: '#f56060', name: 'Red' },
    { id: 9, value: '#fff', name: 'White', border: '1px solid #e8e9eb' },
  ];

  clickColor(id: number) {

  }

  public sizes = [
    { id: 0, value: 'XS'},
    { id: 1, value: 'S'},
    { id: 2, value: 'M'},
    { id: 3, value: 'L'},
    { id: 4, value: 'XL'},
    { id: 5, value: 'XXL'},
  ];

  selectedSizes: number[] = JSON.parse(localStorage.getItem('selected') || '[]');
  onSelectionSizeChange(event: MatSelectionListChange): void {
    this.selectedSizes = event.source.selectedOptions.selected.map((option: MatListOption) => option.value);
  }

  onCheckboxSizes(value: string) {

    const selectedProducts = (this.form.controls['sizes'] as FormArray);
    if (value) {
      selectedProducts.push(new FormControl(value));
    } else {
      const index = selectedProducts.controls
      .findIndex(x => x.value === value);
      selectedProducts.removeAt(index);
    }
  }

  get resultSize() {
    return this.sizes.filter(item => item.id && item.value);
  }
  checkboxSizes(id: number, value: string) {
    console.log(id, value);
  }

  formatLabel(value: number) {
    if (value >= 1) {
      return Math.round(value / 1) + '€';
    }

    return value;
  }



  // document.querySelector('.sizes a span, .categories a span').each(function(i, el){
	// 	document.querySelector(el).insertAdjacentHTML("beforeend",'<span class="x"></span><span class="y"></span>');

	// 	document.querySelector(el).parent().addEventListener('click', function(){
	// 		if(document.querySelector(this).classList.contains('checked')){
	// 			document.querySelector(el).querySelector('.y').classList.remove('animate');
	// 			setTimeout(function(){
	// 				document.querySelector(el).querySelector('.x').classList.remove('animate');
	// 			}, 50);
	// 			document.querySelector(this).classList.remove('checked');
	// 			return false;
	// 		}

	// 		document.querySelector(el).querySelector('.x').classList.add('animate');
	// 		setTimeout(function(){
	// 			document.querySelector(el).querySelector('.y').classList.add('animate');
	// 		}, 100);
	// 		document.querySelector(this).classList.add('checked');
	// 		return false;
	// 	});
	// });
}
