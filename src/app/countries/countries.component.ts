import {Component, OnInit} from '@angular/core';
import {CountryDataService} from '../api/country-data.service';
import {Router} from '@angular/router';
import {CountryDetailsComponent} from '../country-details/country-details.component';

@Component({
  selector: 'app-books',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  private PAGE_REQUEST: PageRequest = {page: 0, size: 9, sortBy: '', sortStrategy: ''};
  private SELECTED_COUNTRY: Country;
  PAGE: Page<Country>;

  constructor(private countryDataService: CountryDataService,
              private countryDetailsComponent: CountryDetailsComponent,
              private router: Router) {
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.countryDataService.getPage(this.PAGE_REQUEST)
      .subscribe((page: Page<Country>) => this.PAGE = page);
  }

  nextPage() {
    this.PAGE_REQUEST.page++;
    this.fetch();
    console.log(this.PAGE.content);
  }

  previousPage() {
    this.PAGE_REQUEST.page--;
    this.fetch();
    console.log(this.PAGE.content);
  }

  setSelected(country: Country): void {
    this.SELECTED_COUNTRY = country;
    this.gotoDetail();
  }

  gotoDetail(): void {
    this.router.navigate(['/countries/', this.SELECTED_COUNTRY.id]).then(() => this.fetch());
  }

  gotoCreate(): void {
    this.router.navigate(['/countries/create']).then(() => this.fetch());
  }

  closeCard(event) {
    event.stopPropagation();
    event.target.closest('.card').classList.add('closed');

  }

  openCard(event) {
    if (event.currentTarget.classList.contains('closed')) {
      event.currentTarget.classList.remove('closed');
    }
  }

  clickBtn(event) {
    if (event.currentTarget.classList.contains('clicked')) {
      event.currentTarget.classList.remove('clicked');
    } else {
      event.currentTarget.classList.add('clicked');
    }
  }
}
