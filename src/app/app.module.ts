import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { KilometersPerHourPipe } from './kilometers-per-hour.pipe';

@NgModule({
  declarations: [
    AppComponent,
    KilometersPerHourPipe
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
