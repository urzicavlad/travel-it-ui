import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Country} from '../../models/country.model';
import {CountryService} from '../../services/country.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  page: Page<Country>;
  api = 'http://localhost:8080/api/countries/';
  @ViewChild('searchValue', {static: true}) searchValue: ElementRef;

  constructor(private countryService: CountryService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onPageUpdate(page: Page<Country>) {
    this.page = page;
  }

  goToCountry() {
    const sv = this.searchValue.nativeElement.value;
    console.log(sv);
    this.countryService.getByName(sv).subscribe(country => {
      console.log(country);
      this.router.navigate(['/countries/', country.id], {state: country})
        .then(e => console.log(e));
    }, error => {
      alert(error.error.message);
    });
  }
}
