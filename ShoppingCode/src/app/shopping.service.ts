import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError, throwError, filter } from 'rxjs';

export interface Product {
  _id: String,
  images: String[],
  name: String,
  description: String,
  price: number,
  sizes: String[],
  colors: {
    name: String,
    value: String,
  }[],
  count: number,
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  shoppingUrl = '/api/'

  public products: Product[] = [];
  public cartItems: Product[] = [];
  public categoryFilter: String[] = [];
  public sizeFilter: String[] = [];
  public colorFilter: String[] = [];
  public priceFilter: number = 900;

  constructor(
    private http: HttpClient,
    ) {}

  public setCategoryFilter(filter: String[]) {
    this.categoryFilter = filter;
    this.loadProducts();
  }
  public setSizeFilter(filter: String[]) {
    this.sizeFilter = filter;
    this.loadProducts();
  }

  public setColorFilter(filter: String[]) {
    this.colorFilter = filter;
    this.loadProducts();
  }

  public setPriceFilter(filter: number) {
    this.priceFilter = filter;
    this.loadProducts();
  }

  public loadProducts() {
    this.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });

  }

  public getProducts() {
    let filters: String[] = [];
    if (this.categoryFilter.length > 0) {
      filters.push(`categories=${encodeURIComponent(this.categoryFilter.join(','))}`);
    }
    if (this.sizeFilter.length > 0) {
      filters.push(`sizes=${encodeURIComponent(this.sizeFilter.join(','))}`);
    }
    if (this.colorFilter.length > 0){
      filters.push(`colors=${encodeURIComponent(this.colorFilter.join(','))}`)
    }
      filters.push(`prices=${encodeURIComponent(this.priceFilter)}`)
    //?sizes=m,l&color=blue  httpclient docu anschauen
    let newUrl = `${this.shoppingUrl}product?${filters.join('&')}`;

    return this.http.get<Product[]>(newUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  addToCart(product: Product) {
    let cartItem = this.cartItems.find(i => i._id === product._id);
    if (cartItem) {
      cartItem.count += 1;
    } else {
      this.cartItems.push({ ...product, count: 1 });
    }
    // console.log('CART ITEMS', this.cartItems);
  }

  getItems() {
    return this.products;
  }

  clearCartItem(product: Product) {
    let cartItem = this.cartItems.find(i => i._id === product._id);
    if (cartItem!.count > 1) {
      cartItem!.count -= 1;
    } else {
      this.cartItems.splice(this.cartItems.indexOf(cartItem!), 1)
    }
  }

  getItemCount() {
    return this.cartItems.reduce((acc, val) => acc + val.count, 0);
  }

  getTotalPrice() {
    return Math.round(this.cartItems.reduce((acc, val) => acc + (val.count * val.price), 0) * 100) / 100;
  }
}
