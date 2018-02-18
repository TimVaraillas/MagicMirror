import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  now: Date = new Date();
  ephemeris: any;

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

  ngOnInit() {
    this.getDate();
    this.getEphemeris();
  }

}
