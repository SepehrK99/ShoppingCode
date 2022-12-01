import { HttpClient, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  shoppingUrl = '/api/'

  public isUserLoggedIn = false;

  constructor(
    private http: HttpClient,
    private _router: Router,
  ) {}

  getTypeRequest(url: any) {
    return this.http.get(`${this.shoppingUrl}${url}`).pipe(map(res => {
      return res;
    }));
  }

  postTypeRequest(url: any, payload: any) {
    console.log(payload);
    return this.http.post(`${this.shoppingUrl}${url}`, payload).pipe(map(res => {
      return res;
    }));
  }

  putTypeRequest(url: any, payload: any) {
    return this.http.put(`${this.shoppingUrl}${url}`, payload).pipe(map(res => {
      return res;
    }));
  }


  getUserDetails() {
    if(localStorage.getItem('userData')){
      return localStorage.getItem('userData');

    }else{
      return null;
    }
  }

  isUserLogin(){
    console.log("localstorage has User: " + (this.getUserDetails() != null));

    if(this.getUserDetails() != null){
      this.isUserLoggedIn = true;
      console.log("SETTING USER TO LOGGED IN AT Login ISUSERLOGIN");
    }else {
      this.isUserLoggedIn = false;
      console.log("NOT SETTING USER TO LOGGED IN AT Login ISUSERLOGIN BECAUSE GETUSERDETAILS WAS FALSE");
    }
  }

  setDataInLocalStorage(variableName: string, data: string) {
      localStorage.setItem(variableName, data);
  }

  getToken() {
      return localStorage.getItem('token');
  }

  clearStorage() {
      localStorage.clear();
  }



  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.getToken()) {
      return true;
    }
    // navigate to login page
    this._router.navigate(['login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }



  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') }).clone({
      setHeaders: {
        Authorization: `${this.getToken()}`
      }
    });
    return next.handle(request);
  }
}
