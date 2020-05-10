import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {BooksComponent} from './books/books.component';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BookDetailsComponent} from './book-details/book-details.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BooksComponent,
    HomeComponent,
    UsersComponent,
    BookDetailsComponent,
    BookCreateComponent,
    RegisterComponent
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
export class AppModule {
}
