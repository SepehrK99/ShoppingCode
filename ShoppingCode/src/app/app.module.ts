import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { CartComponent } from './cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreComponent } from './store/store.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { ItemsComponent } from './items/items.component';
import { SlectorComponent } from './slector/slector.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { ContactComponent } from './contact/contact.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { SigninComponent } from './signin/signin.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SearchComponent,
    CartComponent,
    StoreComponent,
    ItemsComponent,
    SlectorComponent,
    ImpressumComponent,
    ContactComponent,
    DatenschutzComponent,
    SigninComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
