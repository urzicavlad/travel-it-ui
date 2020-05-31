import {Component, Input, OnInit} from '@angular/core';
import {Country} from '../../models/country.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-country-item',
  templateUrl: './country-item.component.html',
  styleUrls: ['./country-item.component.scss']
})
export class CountryItemComponent implements OnInit {

  @Input() country: Country;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  closeCard() {
    console.log('close');
  }

  gotoDetail(): void {
    this.router.navigate(['/countries/', this.country.id], { state: this.country})
      .then(e => console.log(e));
  }

  openCard() {
    this.gotoDetail();
    console.log(this.country);
  }

}
