import {Component, Input, OnInit} from '@angular/core';
import {City} from '../../models/city.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-city-item',
  templateUrl: './city-item.component.html',
  styleUrls: ['./city-item.component.scss']
})
export class CityItemComponent implements OnInit {

  @Input() city: City;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  closeCard() {
    console.log('close');
  }

  gotoDetail(): void {
    this.router.navigate([`/cities/`, this.city.id], {state: this.city})
      .then(e => console.log(e));
  }

  openCard() {
    this.gotoDetail();
    console.log(this.city);
  }

}
