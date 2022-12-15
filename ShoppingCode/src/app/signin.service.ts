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
    private router: Router,
  ) {}

  getTypeRequest(url: any) {
    return this.http.get(`${this.shoppingUrl}${url}`).pipe(map(res => {
      return res;
    }));
  }

  postTypeRequest(url: any, payload: any) {
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
    if(this.getUserDetails() != null){
      this.isUserLoggedIn = true;
    }else {
      this.isUserLoggedIn = false;
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
    this.router.navigate(['login']);
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
