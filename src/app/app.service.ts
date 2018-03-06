import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Forecast } from './models/forecast';
import { City } from './models/city';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppService {
  private apiKey = 'yourAPIkey'
  private baseURL = 'http://api.openweathermap.org/data/2.5/'

  private city: City = new City();
  private forecasts: Forecast[] = new Array<Forecast>();

  private sixteenDaysForecastURL = `${this.baseURL}forecast/daily?units=metric&id=6455645&appid=${this.apiKey}&lang=fr`;
  private currentWeatherURL = `${this.baseURL}weather?id=6455645&units=metric&appid=${this.apiKey}&lang=fr`;

  constructor(private http: Http) { }

  getEphemeris(): Observable<any> {
    return this.http.get('assets/json/ephemeris.json')
      .map((res) => res.json())
      .catch((error) => error);
  }

  getCity(): Promise<City> {
    return this.http
      .get(this.sixteenDaysForecastURL)
      .toPromise()
      .then((response) => {
        this.city.id = response.json().city.id;
        this.city.name = response.json().city.name;
        this.city.country = response.json().city.country;
        this.city.coord.lon = response.json().city.coord.lon;
        this.city.coord.lat = response.json().city.coord.lat;
        return this.city;
      })
      .catch(this.handleError);
  }

  getCurrentWeather(): Promise<Forecast> {
    return this.http
      .get(this.currentWeatherURL)
      .toPromise()
      .then((response) => {
        const data = response.json();
        const currentWeather: Forecast = new Forecast();
        currentWeather.date = new Date(data.dt * 1000).toLocaleDateString('fr-FR', {weekday: 'long', month: 'long', day: 'numeric'});
        currentWeather.weather = data.weather[0].description;
        currentWeather.icon = 'assets/img/weather/' + data.weather[0].icon + '.svg' ;
        currentWeather.clouds = data.clouds.all;
        currentWeather.humidity = data.main.humidity;
        currentWeather.pressure = data.main.pressure;
        currentWeather.windSpeed = data.wind.speed;
        currentWeather.dayTemperature = data.main.temp;
        currentWeather.maxTemperature = data.main.temp_max;
        currentWeather.minTemperature = data.main.temp_min;
        currentWeather.class = 'c' + data.weather[0].icon;
        return currentWeather;
      })
      .catch(this.handleError);
  }

  getSixteenDaysForecast(): Promise<Forecast[]> {
    return this.http
      .get(this.sixteenDaysForecastURL)
      .toPromise()
      .then((response) => {
        //La boucle commence à l'indice d'itération 1. L'indice 0 représente le jour actuel, qui ne nous intéresse pas ici
        for (let i = 1; i < 7; i++){
          const element = response.json().list[i];
          const forecast = new Forecast();

          forecast.date = new Date(element.dt * 1000).toLocaleDateString('fr-FR', {weekday: 'long'});
          forecast.weather = element.weather[0].description;
          forecast.icon = 'assets/img/weather/' + element.weather[0].icon + '.svg' ;
          forecast.clouds = element.clouds;
          forecast.humidity = element.humidity;
          forecast.pressure = element.pressure;
          forecast.windSpeed = element.speed;
          forecast.morningTemperature = element.temp.morn;
          forecast.dayTemperature = element.temp.day;
          forecast.eveningTemperature = element.temp.eve;
          forecast.nightTemperature = element.temp.night;
          forecast.maxTemperature = element.temp.max;
          forecast.minTemperature = element.temp.min;
          forecast.class = 'c' + element.weather[0].icon;
          this.forecasts.push(forecast);
        }

        return this.forecasts;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
