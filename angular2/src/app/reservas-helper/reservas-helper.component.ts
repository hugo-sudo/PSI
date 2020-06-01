import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../shared/reserva.service';
import { HotelService } from '../shared/hotel.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { Reserva } from '../shared/reserva.model';
import { Hotel } from '../shared/hotel.model';

@Component({
  selector: 'app-reservas-helper',
  templateUrl: './reservas-helper.component.html',
  styleUrls: ['./reservas-helper.component.css'],
  providers: [ReservaService, HotelService]
})
export class ReservasHelperComponent implements OnInit {
  public showQ1 = false;
  public showQ2 = false;
  public showQ3  = false;
  public showQ4  = false;
  constructor(public _reservaService: ReservaService,
    public _hotelService: HotelService,
    public _router: Router,
    private _activeRouter: ActivatedRoute,
    private _location: Location) { }

  ngOnInit(): void {

    this._reservaService.getReservaList().subscribe((res) => {
      this._reservaService.reservas = res as Reserva[];
    });
    this._hotelService.getHotel(this._router.url.toString().split('/')[3]).subscribe((res) => {
      this._hotelService.hotel = res as Hotel;
    });
    this._activeRouter.url.subscribe(url => {

      switch (this._router.url.toString().split('/')[4]){
        case '0': this.showQ1 = true; break;
        case '1': this.showQ2 = true; break;
        case '2': this.showQ3 = true; break;
        case '3': this.showQ4 = true; break;
      }

    });
  }

  cancelar(){
    this._location.back();
  }

  confirmar(hotel: Hotel){

      console.log('inicio');

      console.log('final');
      const reservaaaa: Reserva = new Reserva(this._hotelService.hotel.name,
        this._router.url.toString().split('/')[5] + '&' + this._router.url.toString().split('/')[6],
          document.getElementById('tipo' + this._router.url.toString().split('/')[4]).innerHTML ,
          document.getElementById('nome').innerHTML,
          document.getElementById('morada').innerHTML,
          document.getElementById('telefone').innerHTML,
          document.getElementById('email').innerHTML,
          document.getElementById('nif').innerHTML,
          document.getElementById('nCartao').innerHTML,
          document.getElementById('prazo').innerHTML,
          document.getElementById('cvv').innerHTML,
          parseInt(this._router.url.toString().split('/')[7]));
      console.log('data:' + reservaaaa.datas);
      console.log('tipoquarto:' + reservaaaa.tipoQuarto);
      console.log('nome:' + reservaaaa.nome);
      console.log('morada:' + reservaaaa.morada);
      console.log('telefone:' + reservaaaa.telefone);
      console.log('email:' + reservaaaa.email);
      console.log('nif:' + reservaaaa.NIF);
      console.log('ncartao:' + reservaaaa.nCartao);
      console.log('prazo:' + reservaaaa.prazo);
      console.log('cvv:' + reservaaaa.cvv);
      console.log('totalpago:' + reservaaaa.totalPago);
      this._reservaService.postReserva(reservaaaa).subscribe((res) => {
        console.log('DENTRO POST');
      });
      const dateI: Date = new Date(this._router.url.toString().split('/')[5]);
      const dateF: Date = new Date(this._router.url.toString().split('/')[6]);
      console.log('HOTEL: ' + hotel.name);
      while (dateI <= dateF){
        console.log(dateI);
        if (this.showQ1){
          console.log(dateI.toISOString().slice(0, 10));
          if (hotel.reservationsQuarto1.findIndex(element => element.includes(dateI.toISOString().slice(0, 10))) != -1){
            let index = hotel.reservationsQuarto1.findIndex(element => element.includes(dateI.toISOString().slice(0, 10)));
            hotel.reservationsQuarto1[index] = dateI.toISOString().slice(0, 10) + ':' + (parseInt(hotel.reservationsQuarto1[index].split(':')[1]) + 1);
          }else{
            hotel.reservationsQuarto1[hotel.reservationsQuarto1.length] = dateI.toISOString().slice(0, 10) + ':1';
          }
        }else if (this.showQ2){
          if (hotel.reservationsQuarto2.findIndex(element => element.includes(dateI.toISOString().slice(0, 10))) != -1){
            let index = hotel.reservationsQuarto2.findIndex(element => element.includes(dateI.toISOString().slice(0, 10)));
            hotel.reservationsQuarto2[index] = dateI.toISOString().slice(0, 10) + ':' + (parseInt(hotel.reservationsQuarto2[index].split(':')[1]) + 1);
          }else{
            hotel.reservationsQuarto2[hotel.reservationsQuarto2.length] = dateI.toISOString().slice(0, 10) + ':1';
          }
        }else if (this.showQ3){
          console.log(dateI.toISOString().slice(0, 10));
          console.log(hotel.reservationsQuarto3);
          if (hotel.reservationsQuarto3.findIndex(element => element.includes(dateI.toISOString().slice(0, 10))) != -1){
            let index = hotel.reservationsQuarto3.findIndex(element => element.includes(dateI.toISOString().slice(0, 10)));
            hotel.reservationsQuarto3[index] =
              dateI.toISOString().slice(0, 10) + ':' + (parseInt(hotel.reservationsQuarto3[index].split(':')[1]) + 1);
            console.log('deu true');
          }else{
            hotel.reservationsQuarto3[hotel.reservationsQuarto3.length] = dateI.toISOString().slice(0, 10) + ':1';
          }
        }else if (this.showQ4){
          if (hotel.reservationsQuarto4.indexOf(dateI.toISOString().slice(0, 10)) != -1){
            let index = hotel.reservationsQuarto4.findIndex(element => element.includes(dateI.toISOString().slice(0, 10)));
            hotel.reservationsQuarto4[index] = dateI.toISOString().slice(0, 10) + ':' + (parseInt(hotel.reservationsQuarto4[index].split(':')[1]) + 1);
          }else{
            hotel.reservationsQuarto4[hotel.reservationsQuarto4.length] = dateI.toISOString().slice(0, 10) + ':1';
          }
        }
        dateI.setDate(dateI.getDate() + 1);
      }
      console.log('resultados finais:');
      console.log(hotel.reservationsQuarto1);
      console.log(hotel.reservationsQuarto2);
      console.log(hotel.reservationsQuarto3);
      console.log(hotel.reservationsQuarto4);

      this._hotelService.updateHotel(hotel).subscribe(
        () => {
        console.log('PUT');
      });

      this._router.navigate(['/home']);


    }

}
