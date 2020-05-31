import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavComponent} from './components/nav/nav.component';
import {UsersComponent} from './users/users.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AccountComponent} from './account/account.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {CountryItemComponent} from './components/country-item/country-item.component';
import {PaginationComponent} from './components/pagination/pagination.component';
import {CountriesComponent} from './components/countries/countries.component';
import {CitiesComponent} from './components/cities/cities.component';
import {CountryDetailComponent} from './components/country-detail/country-detail.component';
import {CityDetailComponent} from './components/city-detail/city-detail.component';
import {CityItemComponent} from './components/city-item/city-item.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    CountriesComponent,
    CountryItemComponent,
    CountryDetailComponent,
    AboutUsComponent,
    UsersComponent,
    RegisterComponent,
    AccountComponent,
    LoginComponent,
    PaginationComponent,
    CitiesComponent,
    CountryDetailComponent,
    CityDetailComponent,
    CityItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
