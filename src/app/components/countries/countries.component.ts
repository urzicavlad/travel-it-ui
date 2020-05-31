import {Component, OnInit} from '@angular/core';
import {Country} from '../../models/country.model';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  page: Page<Country>;
  api = 'http://localhost:8080/api/countries/';

  constructor() {}

  ngOnInit(): void {
  }

  onPageUpdate(page: Page<Country>) {
    this.page = page;
  }

}
