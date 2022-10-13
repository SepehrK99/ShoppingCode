import { Component,} from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent{
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

  clickCategory(id: number) {

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
