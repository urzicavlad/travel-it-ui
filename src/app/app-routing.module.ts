import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BooksComponent} from './books/books.component';
import {UsersComponent} from './users/users.component';
import {BookDetailsComponent} from './book-details/book-details.component';
import {BookCreateComponent} from './book-create/book-create.component';
import {RegisterComponent} from './register/register.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'books', component: BooksComponent},
  {path: 'books/create', component: BookCreateComponent},
  {path: 'books/:id', component: BookDetailsComponent},
  {path: 'users', component: UsersComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
