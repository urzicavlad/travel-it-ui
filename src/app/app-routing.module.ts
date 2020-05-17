import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users/users.component';
import {RegisterComponent} from './register/register.component';
import {CountriesComponent} from './countries/countries.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AccountComponent} from './account/account.component';
import {AboutUsComponent} from './about-us/about-us.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'countries', component: CountriesComponent},
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
