import {Component, OnInit} from '@angular/core';
import {City} from '../../models/city.model';
import {Router} from '@angular/router';
import {RecommendationService} from '../../services/recommendation.service';
import {Recommendation} from '../../models/recommendation.model';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss']
})
export class CityDetailComponent implements OnInit {

  public city: City;
  public recommendations: Recommendation[];

  constructor(private router: Router, private recommendationService: RecommendationService) {
    this.city = this.router.getCurrentNavigation().extras.state as City;
  }

  ngOnInit() {
    this.recommendationService.getByCityName(this.city.name).subscribe(recommendations => {
      this.recommendations = recommendations;
    });
  }

}
