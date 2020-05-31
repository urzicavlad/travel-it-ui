import {Component, Input, OnInit} from '@angular/core';
import {Country} from '../../models/country.model';
import {City} from '../../models/city.model';
import {CityService} from '../../services/city.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  @Input() country: Country;
  cities: City[];

  constructor(private cityService: CityService) {
  }

  ngOnInit() {
    this.cityService.getByCountryName(this.country.name).subscribe(cities => {
      this.cities = cities;
    });
  }

}
