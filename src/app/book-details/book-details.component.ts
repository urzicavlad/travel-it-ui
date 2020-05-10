import {Component, Injectable, OnInit} from '@angular/core';
import {BookDataService} from '../api/book-data.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Params} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class BookDetailsComponent implements OnInit {

  private SELECTED_BOOK: Book;
  private SUCCESS_UPDATED: boolean;
  private SUCCESS_DELETED: boolean;
  private ERROR_OCCURRED: boolean;

  constructor(private bookDataService: BookDataService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  get successUpdated() {
    return this.SUCCESS_UPDATED;
  }

  get successDeleted() {
    return this.SUCCESS_DELETED;
  }

  get errorOccurred() {
    return this.ERROR_OCCURRED;
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
          return this.bookDataService.getBookById(params.id);
        }
      )).subscribe(book => {
      this.SELECTED_BOOK = book;
    });
  }

  get selectedBook(): Book {
    return this.SELECTED_BOOK;
  }

  updateSelectedBook() {
    this.bookDataService.updateBook(this.SELECTED_BOOK)
      .subscribe(() => {
          this.SUCCESS_UPDATED = true;
        },
        error => {
          console.log('Error in saving book: ', error);
          this.SUCCESS_UPDATED = false;
          setTimeout(e => {
            // show error alert
            this.ERROR_OCCURRED = true;
          }, 2000);
          this.ERROR_OCCURRED = false;
        },
        () => {
          console.log('Book was saved!');
          setTimeout(e => {
            this.SUCCESS_UPDATED = false;
          }, 2000);
        });
    this.gotoBooks();
  }

  deleteSelectedBook() {
    this.bookDataService.deleteBook(this.SELECTED_BOOK).subscribe(() => {
        this.SUCCESS_DELETED = true;
        // this.BOOKS = this.BOOKS.filter(book => book.id !== this.SELECTED_BOOK.id);
      },
      error => {
        console.log('Error in saving book: ', error);
        this.SUCCESS_DELETED = false;
        setTimeout(e => {
          // show error alert
          this.ERROR_OCCURRED = true;
        }, 2000);
        this.ERROR_OCCURRED = false;
      },
      () => {
        console.log('Book was deleted!');
        setTimeout(e => {
          this.SUCCESS_DELETED = false;
        }, 2000);
      });
    this.gotoBooks();
  }

  gotoBooks(): void {
    console.log('Go to bookDetails');
    this.location.back();
  }
}
