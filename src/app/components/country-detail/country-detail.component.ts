import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Country} from '../../models/country.model';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {

  country: Country;

 constructor(private router: Router) {
    this.country = this.router.getCurrentNavigation().extras.state as Country;
  }

  ngOnInit() {
  }

}
