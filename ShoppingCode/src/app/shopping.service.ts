import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError, throwError } from 'rxjs';

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

export class Message {
  _id!: String;
  name!: String;
  email!: String;
  message!: String;
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  shoppingUrl = '/api/'

  constructor(private http: HttpClient) {}

  public getProducts() {
    //?sizes=m,l&color=blue  httpclient docu anschauen
    return this.http.get<Product[]>(`${this.shoppingUrl}product`)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  public getMessage(message: Message){
    this.http.post(`${this.shoppingUrl}message`, message)
    .subscribe(data =>{

    })
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

  // getConfig_1() {
  //   return this.http.get<Shopping>(this.shoppingUrl);
  // }

  // getConfig_2() {
  //   // now returns an Observable of Config
  //   return this.http.get<Shopping>(this.shoppingUrl);
  // }

  // getConfig_3() {
  //   return this.http.get<Shopping>(this.shoppingUrl)
  //     .pipe(
  //       catchError(this.shoppingError)
  //     );
  // }

  // getConfigResponse(): Observable<HttpResponse<Shopping>> {
  //   return this.http.get<Shopping>(
  //     this.shoppingUrl, { observe: 'response' });
  // }
}
