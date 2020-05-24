import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotelIndividualComponent } from './hotel-individual/hotel-individual.component';
import { HotelComponent } from './hotel/hotel.component';
import { HomeComponent } from './home/home.component';
import { QuartoComponent } from './quarto/quarto.component';
import { ReservaComponent } from './reserva/reserva.component';
import { ReservasComponent } from './reservas/reservas.component';




const routes: Routes = [
  { path: 'hotel/:id', component: HotelIndividualComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'hotel', component: HotelComponent },
  { path: 'home', component: HomeComponent },
  { path: 'hotel/quarto1/:id', component: QuartoComponent },
  { path: 'hotel/quarto2/:id', component: QuartoComponent },
  { path: 'hotel/quarto3/:id', component: QuartoComponent },
  { path: 'hotel/quarto4/:id', component: QuartoComponent },
  { path: 'hotel/todos/:id', component: QuartoComponent },
  { path: 'hotel/reservas/:id/:tipo/:inicio/:fim/:preco', component: ReservaComponent },
  { path: 'reservas/:email', component: ReservasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
