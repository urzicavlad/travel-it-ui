import {Component, OnInit} from '@angular/core';
import {BookDataService} from '../api/book-data.service';
import {BookDetailsComponent} from '../book-details/book-details.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  private PAGE_REQUEST: PageRequest = {page: 0, size: 9, sortBy: '', sortStrategy: ''};
  private SELECTED_BOOK: Book;
  private PAGE: Page<Book>;

  constructor(private bookDataService: BookDataService,
              private bookDetailsComponent: BookDetailsComponent,
              private router: Router) {
  }

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.bookDataService.getPage(this.PAGE_REQUEST)
      .subscribe((page: Page<Book>) => this.PAGE = page);
  }

  nextPage() {
    this.PAGE_REQUEST.page++;
    this.fetchBooks();
    console.log(this.PAGE.content);
  }

  previousPage() {
    this.PAGE_REQUEST.page--;
    this.fetchBooks();
    console.log(this.PAGE.content);
  }

  setSelectedBook(book: Book): void {
    this.SELECTED_BOOK = book;
    this.gotoDetail();
  }

  gotoDetail(): void {
    this.router.navigate(['/books/', this.SELECTED_BOOK.id]).then(() => this.fetchBooks());
  }

  gotoCreate(): void {
    this.router.navigate(['/books/create']).then(() => this.fetchBooks());
  }

}
