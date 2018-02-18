import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service';
import { Forecast } from './models/forecast';
import { City } from './models/city';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    'normalize.css'
  ]
})
export class AppComponent implements OnInit{

  now: Date = new Date();
  ephemeris: any;
  city: City = new City();
  sixteenDaysForecast: Forecast[] = [];
  currentWeather: Forecast = new Forecast();
  error: any;

  constructor(
    private appService: AppService
  ) {}

  getDate(): void {
    setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  getEphemeris(): void {
    this.appService.getEphemeris().subscribe(res => {
      res.forEach(eph => {
        const day = this.now.getDate();
        const month = this.now.getMonth() + 1;
        if (eph.date.jour === day && eph.date.mois === month) {
          this.ephemeris = eph.fete;
        }
      });
    }, error => {
      console.log(error);
    });
  }

  getCity(): void {
    this.appService.getCity()
      .then(city => this.city = city)
      .catch(error => this.error = error);
  }

  getCurrentWeather(): void {
    this.appService.getCurrentWeather()
      .then(currentWeather => {
        this.currentWeather = currentWeather;
        console.log(currentWeather);
      })
      .catch(error => this.error = error);
  }

  getForecasts(): void {
    this.appService.getSixteenDaysForecast()
      .then(forecasts => {
        this.sixteenDaysForecast = forecasts;
        console.log(forecasts);
      })
      .catch(error => this.error = error);
  }

  ngOnInit() {
    this.getDate();
    this.getEphemeris();
    this.getCity();
    this.getCurrentWeather();
    this.getForecasts();
  }

}
