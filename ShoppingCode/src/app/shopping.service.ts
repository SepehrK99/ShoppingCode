import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError, throwError, filter } from 'rxjs';

export interface Product {
  _id: String,
  images: String[],
  name: String,
  description: String,
  price: Number,
  sizes: String[],
  colors: {
    name: String,
    value: String,
  }[],
}
@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  shoppingUrl = '/api/'

  public products: Product[] = [];
  public categoryFilter: String[] = [];
  public sizeFilter: String[] = [];
  public colorFilter: String[] = [];

  constructor(private http: HttpClient) {}

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
    //?sizes=m,l&color=blue  httpclient docu anschauen
    return this.http.get<Product[]>(`${this.shoppingUrl}product?${filters.join('&')}`)
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
}
