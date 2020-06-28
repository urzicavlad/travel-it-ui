import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {CookieUtilsService} from '../services/cookie-utils-service';
import {CountryService} from '../services/country.service';
import {Country} from '../models/country.model';
import {City} from '../models/city.model';
import {CityService} from '../services/city.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user: User;

  countryNames: string[];
  usernames: string[];

  constructor(public cookieUtilsService: CookieUtilsService,
              public userService: UserService,
              public countryService: CountryService,
              public cityService: CityService
  ) {
  }

  ngOnInit() {
    const username = this.cookieUtilsService.getCookie('user-logged');
    this.userService.getByUsername(username).subscribe(user => {
      this.user = user;
      console.log(JSON.stringify(this.user));
    });
    this.countryService.getAll().subscribe(countries => {
        this.countryNames = countries.map(c => c.name);
        console.log(this.countryNames);
      }
    );
    this.userService.getAll().subscribe(users => {
      this.usernames = users.map(c => c.username);
      console.log(this.usernames);
    });
  }

  onCountrySubmit(countryName: HTMLInputElement, imageUrl: HTMLInputElement, countryDesc: HTMLTextAreaElement) {
    const country = new Country();
    country.name = countryName.value;
    country.image = imageUrl.value;
    country.description = countryDesc.value;
    console.log(JSON.stringify(country));
    this.countryService.save(country).subscribe(c => console.log(c));
  }

  onCitySubmit(cityName: HTMLInputElement, cityCountryName: HTMLSelectElement, cityDesc: HTMLTextAreaElement) {
    const city = new City();
    city.name = cityName.value;
    city.countryName = cityCountryName.value;
    city.description = cityDesc.value;
    console.log(JSON.stringify(city));
    this.cityService.save(city).subscribe(c => console.log(c));
  }


  onChangeUserRoleSubmit(username: HTMLSelectElement, role: HTMLSelectElement) {
    this.userService.updateRole(username.value, role.value);
  }
}

