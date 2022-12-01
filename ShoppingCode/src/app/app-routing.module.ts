import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { ItemsComponent } from './items/items.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { SigninComponent } from './signin/signin.component';
import { StoreComponent } from './store/store.component';
import { SigninService } from './signin.service';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/store', pathMatch: 'full' },
  { path: 'store', component: StoreComponent },
  { path: 'selector', component: StoreComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'search', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'datenschutz', component: DatenschutzComponent },
  { path: 'cart' , component: CartComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'profile', canActivate: [SigninService], component: ProfileComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})

export class AppRoutingModule {}
