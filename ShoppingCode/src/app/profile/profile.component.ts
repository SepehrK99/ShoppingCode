import { Component, OnInit } from '@angular/core';
import { SigninService } from '../signin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public protectedData: any
  public loading: boolean = false

  constructor(
    private singin: SigninService,

  ) { }

  ngOnInit(): void {


    this.singin.getTypeRequest('profile').subscribe((res: any) => {
      this.protectedData = res
    });

  }

}
