import {Component, Injectable, OnInit} from '@angular/core';
import {CountryDataService} from '../api/country-data.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Params} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-book-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class CountryDetailsComponent implements OnInit {

  SELECTED_COUNTRY: Country;
  private SUCCESS_UPDATED: boolean;
  private SUCCESS_DELETED: boolean;
  private ERROR_OCCURRED: boolean;

  constructor(private countryDataService: CountryDataService,
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
          return this.countryDataService.getById(params.id);
        }
      )).subscribe(country => {
      this.SELECTED_COUNTRY = country;
    });
  }

  get selectedCountry(): Country {
    return this.SELECTED_COUNTRY;
  }

  updateSelected() {
    this.countryDataService.update(this.SELECTED_COUNTRY)
      .subscribe(() => {
          this.SUCCESS_UPDATED = true;
        },
        error => {
          console.log('Error in saving country: ', error);
          this.SUCCESS_UPDATED = false;
          setTimeout(e => {
            // show error alert
            this.ERROR_OCCURRED = true;
          }, 2000);
          this.ERROR_OCCURRED = false;
        },
        () => {
          console.log('Country was saved!');
          setTimeout(e => {
            this.SUCCESS_UPDATED = false;
          }, 2000);
        });
    this.gotoCountries();
  }

  deleteSelected() {
    this.countryDataService.delete(this.SELECTED_COUNTRY).subscribe(() => {
        this.SUCCESS_DELETED = true;
        // this.BOOKS = this.BOOKS.filter(book => book.id !== this.SELECTED_BOOK.id);
      },
      error => {
        console.log('Error in saving country: ', error);
        this.SUCCESS_DELETED = false;
        setTimeout(e => {
          // show error alert
          this.ERROR_OCCURRED = true;
        }, 2000);
        this.ERROR_OCCURRED = false;
      },
      () => {
        console.log('Country was deleted!');
        setTimeout(e => {
          this.SUCCESS_DELETED = false;
        }, 2000);
      });
    this.gotoCountries();
  }

  gotoCountries(): void {
    console.log('Go to countriesDetails');
    this.location.back();
  }
}
