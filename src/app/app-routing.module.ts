import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users/users.component';
import {RegisterComponent} from './register/register.component';
import {CountriesComponent} from './countries/countries.component';
import {CountryDetailsComponent} from './country-details/country-details.component';
import {LoginComponent} from './login/login.component';


const routes: Routes = [
  {path: 'countries', component: CountriesComponent},
  {path: 'countries/:id', component: CountryDetailsComponent},
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
