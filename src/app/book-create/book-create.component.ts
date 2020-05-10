import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BookDataService} from '../api/book-data.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

  BOOK_FORM: FormGroup;
  submitted = false;
  success = false;
  private SUCCESS_SAVED: boolean;
  private ERROR_OCCURRED: boolean;


  constructor(private bookDataService: BookDataService, private formBuilder: FormBuilder, private location: Location) {
    this.BOOK_FORM = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      year: ['', Validators.required],
      shortDescription: ['', Validators.required],
      publisher: ['', Validators.required],
      city: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.BOOK_FORM.invalid) {
      return;
    }

    this.success = true;
  }

  ngOnInit() {
  }

  gotoBooks(): void {
    console.log('Go to books');
    this.location.back();
  }

  saveBook() {
    const bookToBeSaved: Book = this.BOOK_FORM.getRawValue();
    this.bookDataService.saveBook(bookToBeSaved)
      .subscribe(() => {
          this.SUCCESS_SAVED = true;
        },
        error => {
          console.log('Error in saving book: ', error);
          this.SUCCESS_SAVED = false;
          setTimeout(e => {
            // show error alert
            this.ERROR_OCCURRED = true;
          }, 2000);
          this.ERROR_OCCURRED = false;
        },
        () => {
          console.log('Book was saved!');
          setTimeout(e => {
            this.SUCCESS_SAVED = false;
          }, 2000);
        });
    this.gotoBooks();
  }
}
