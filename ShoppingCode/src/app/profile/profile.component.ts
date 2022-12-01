import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SigninService } from '../signin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public protectedData: any
  public loading: boolean = false

  @Output() close = new EventEmitter<void>();

  constructor(
    private route:Router,
    public signin: SigninService,
  ) {}

  ngOnInit(): void {
    this.signin.getTypeRequest('profile').subscribe((res: any) => {
      this.protectedData = res
    });

  }

  logout(){
    this.signin.clearStorage();
    this.signin.isUserLogin();
    this.route.navigate(['']);
    this.close.emit();
  }
}
