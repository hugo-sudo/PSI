import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotelComponent } from './hotel/hotel.component';
import { HotelIndividualComponent } from './hotel-individual/hotel-individual.component';
import { HomeComponent } from './home/home.component';
import { QuartoComponent } from './quarto/quarto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReservaComponent } from './reserva/reserva.component';
import { ReservasComponent } from './reservas/reservas.component';

@NgModule({
  declarations: [
    AppComponent,
    HotelComponent,
    HotelIndividualComponent,
    HomeComponent,
    QuartoComponent,
    ReservaComponent,
    ReservasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  

 }
