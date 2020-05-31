import {Component, Input, OnInit} from '@angular/core';
import {City} from '../../models/city.model';

@Component({
  selector: 'app-city-item',
  templateUrl: './city-item.component.html',
  styleUrls: ['./city-item.component.scss']
})
export class CityItemComponent implements OnInit {

  @Input() city: City;

  constructor() { }

  ngOnInit() {
  }

}
