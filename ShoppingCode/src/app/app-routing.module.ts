import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { StoreComponent } from './store/store.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:id', component: UserProfileComponent },
  { path: 'shope', component: StoreComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})

export class AppRoutingModule {}
