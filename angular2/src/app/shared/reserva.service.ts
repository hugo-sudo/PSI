import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Reserva } from './reserva.model';

@Injectable({
  providedIn: 'root'
})

export class ReservaService {
  reservaCurrente: Reserva;
  reservas:Reserva[];
  readonly baseURL = 'http://appserver.alunos.di.fc.ul.pt:3009/reserva';
  constructor(private http: HttpClient) { }


  getReservaList() {
    return this.http.get(this.baseURL);
  }

  postReserva(reserva: Reserva){
    return this.http.post(this.baseURL, reserva);
  }
}
