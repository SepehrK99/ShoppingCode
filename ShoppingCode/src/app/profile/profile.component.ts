import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SigninService } from '../signin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: any
  public loading: boolean = false

  @Output() close = new EventEmitter<void>();

  constructor(
    private route:Router,
    public signin: SigninService,
  ) {}

  ngOnInit(): void {
    this.signin.getTypeRequest('profile').subscribe((res: any) => {
      this.signin.setDataInLocalStorage('userData', JSON.stringify(res));
      this.user = res
      console.log('USER', this.user);
    });

  }

  logout(){
    this.signin.clearStorage();
    this.signin.isUserLogin();
    this.route.navigate(['']);
    this.close.emit();
  }

  onSubmit(form: NgForm){
    this.signin.postTypeRequest('profile', form.value).pipe(catchError((error: HttpErrorResponse) => {
      console.log('ERR', error);
      return throwError(() => new Error('Something bad happened; please try again later.'));
    })).subscribe((res: any) => {
      console.log('RES', res);
    });
  }
}
