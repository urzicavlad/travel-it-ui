import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users/users.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AccountComponent} from './account/account.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {CountriesComponent} from './components/countries/countries.component';
import {CitiesComponent} from './components/cities/cities.component';
import {CountryDetailComponent} from './components/country-detail/country-detail.component';
import {CityDetailComponent} from './components/city-detail/city-detail.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'countries', component: CountriesComponent},
  {path: 'countries/:id', component: CountryDetailComponent},
  {path: 'cities', component: CitiesComponent},
  {path: 'cities/:id', component: CityDetailComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'account', component: AccountComponent},
  {path: 'users', component: UsersComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
