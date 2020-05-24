import { Component, OnInit , } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { NgForm } from '@angular/forms';

import { ReservaService } from '../shared/reserva.service';
import { HotelService } from '../shared/hotel.service';

import { Hotel } from '../shared/hotel.model';
import { Reserva } from '../shared/reserva.model';


@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
  providers: [ReservaService, HotelService]
})
export class ReservaComponent implements OnInit {
  public confirmado = false;
  public correctedValues = false;
  public showQ1 = false;
  public showQ2 = false;
  public showQ3  = false;
  public showQ4  = false;
  constructor(public _reservaService: ReservaService,
              public _hotelService: HotelService,
              private _router: Router,
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
      console.log('URL ACTIVE: ' + url.toString());
      console.log('URL: ' + this._router.url.toString());
      document.getElementById('gg').innerHTML = 'De: ' + this._router.url.toString().split('/')[5] + ' a '
      + this._router.url.toString().split('/')[6];
      switch (this._router.url.toString().split('/')[4]){
        case '0': this.showQ1 = true; break;
        case '1': this.showQ2 = true; break;
        case '2': this.showQ3 = true; break;
        case '3': this.showQ4 = true; break;
      }
      document.getElementById('preco').innerHTML = 'preco: ' + this._router.url.toString().split('/')[7].split('?')[0];
      if (this._router.url.toString().split('/')[7].indexOf('?') != -1){
        document.getElementById('nome').innerHTML = this._router.url.toString().split('/')[7].split('?')[1].split('&')[0];
        document.getElementById('morada').innerHTML = this._router.url.toString().split('/')[7].split('?')[1].split('&')[1];
        document.getElementById('telefone').innerHTML = this._router.url.toString().split('/')[7].split('?')[1].split('&')[2];
        document.getElementById('email').innerHTML = this._router.url.toString().split('/')[7].split('?')[1].split('&')[3];
        document.getElementById('nif').innerHTML = this._router.url.toString().split('/')[7].split('?')[1].split('&')[4];
        document.getElementById('nCartao').innerHTML = this._router.url.toString().split('/')[7].split('?')[1].split('&')[5];
        document.getElementById('prazo').innerHTML = this._router.url.toString().split('/')[7].split('?')[1].split('&')[6];
        document.getElementById('cvv').innerHTML = this._router.url.toString().split('/')[7].split('?')[1].split('&')[7];
      }

  });
    // document.getElementById("gg").innerHTML = this._router.url.toString();
    console.log('URL: ' + this._router.url.toString());
  }
  checkValues(){
    const date = new Date();
    const nomeUser = (document.getElementById('nomeInput') as HTMLInputElement).value;
    const nifUser = (document.getElementById('nifInput') as HTMLInputElement).value;
    const emailUser = (document.getElementById('emailInput') as HTMLInputElement).value;
    const telefoneUser = (document.getElementById('telefoneInput') as HTMLInputElement).value;
    const cvvUser = (document.getElementById('cvvInput') as HTMLInputElement).value;
    const nCartaoUser = (document.getElementById('nCartaoInput') as HTMLInputElement).value;
    const moradaUser = (document.getElementById('moradaInput') as HTMLInputElement).value;
    const validadeUser = (document.getElementById('validadeInput') as HTMLInputElement).value;
    const validateString = validadeUser.toString();
    const emailVerifier = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const dateVerifier = /(0\d{1}|1[0-2])\/(19|20)\d{2}/;
    // const nigger = /^\d{1,2})-(\d{4})$/;
    if (nomeUser == '' || nomeUser == null || !/^[a-zA-Z ]+$/.test(nomeUser.toString())) {
      alert ('Nome não é válido!');
      return;
    } else if (nifUser == '' || nifUser == null || !/^[0-9]+$/.test(nifUser.toString()) || nifUser.length < 8 || nifUser.length > 9 ) {
      alert('NIF não é válido!');
      return;
    } else if (emailUser == '' || emailUser == null || !emailVerifier.test(emailUser.toString().toLowerCase()) ) {
      alert('Email não é válido!');
      return;
    } else if (telefoneUser == '' || telefoneUser == null || !/^[0-9]+$/.test(telefoneUser.toString()) || telefoneUser.length != 9) {
      alert ('Telefone não á válido!');
      return;
    } else if (cvvUser == '' || cvvUser == null || !/^[0-9]+$/.test(cvvUser.toString()) || cvvUser.length != 3) {
      alert ('CVV não é válido!');
      return;
    } else if (nCartaoUser == '' || nCartaoUser == null || !/^[0-9]+$/.test(nCartaoUser.toString()) || nCartaoUser.length != 16) {
      alert ('Número de Cartão de crédito não é válido!');
      return;
    } else if (moradaUser == '' || moradaUser == null || moradaUser.length > 100) {
      alert ('Morada não é válida!');
      return;
    // tslint:disable-next-line: max-line-length
    } else if (validadeUser == '' || validadeUser == null || !this.validateDate(validateString.substring(1, 2), validateString.substring(3, 7)) || !dateVerifier.test(validadeUser.toString()) ){
      alert ('Data de validade do cartão de crédito não é válida');
      return;
    }
    /*
    if (/\d/.test(document.getElementById('nome').innerHTML.toString())) {
      alert('Nome não é válido!');
      return;
    } else if ((document.getElementById('nCartao') as HTMLInputElement).value.match(/[a-z]/g) !== null) {
      alert('Número de cartão n\ao é válido!');
      return;
    } else if ((document.getElementById('cvv') as HTMLInputElement).value.match(/[a-z]/g) !== null) {
      alert ('CVV não é válido!');
      return;
    } else if ((document.getElementById('email') as HTMLInputElement).value.match(/[@]/g) === null) {
      alert('Email não é valido!');
      return;
    }
    */
    alert('Todos os dados estão corretos!');
    (document.getElementById('submit') as HTMLInputElement).disabled = false;
  }

validateDate(month: string , year: string) {
  const date = new Date();
  const todayMonth = date.getMonth() + 1;
  const todayYear = date.getFullYear();
  // tslint:disable-next-line: radix
  if (parseInt(year) > todayYear) {
    return true;
  } else if (parseInt(year,10) == todayYear && parseInt(month,10) >= todayMonth) {
    return true;
  } else {
    return false;
  }
}
cancelar(){
    this._location.back();
  }

confirmar(hotel: Hotel){
    if (this._router.url.toString().split('/')[7].indexOf('?') == -1){
      this.confirmado = true;
    }else{
      console.log('inicio');
      /*this._reservaService.reservaCurrente.datas="data";
      tipoquarto
      this._reservaService.reservaCurrente.nome="nome";
      this._reservaService.reservaCurrente.morada="morada";
      this._reservaService.reservaCurrente.telefone="telefone";
      this._reservaService.reservaCurrente.email="email";
      this._reservaService.reservaCurrente.NIF="nif";
      this._reservaService.reservaCurrente.nCartao="nCartao";
      this._reservaService.reservaCurrente.prazo="prazo";
      this._reservaService.reservaCurrente.cvv="cvv";
      this._reservaService.reservaCurrente.totalPago=2;*/
      console.log('final');
      const reservaaaa: Reserva = new Reserva(this._hotelService.hotel.name,
        this._router.url.toString().split('/')[5] + '&' + this._router.url.toString().split('/')[6],
          document.getElementById('tipo' + this._router.url.toString().split('/')[4]).innerHTML ,
          document.getElementById('nome').innerHTML.split('=')[1],
          document.getElementById('morada').innerHTML.split('=')[1],
          document.getElementById('telefone').innerHTML.split('=')[1],
          document.getElementById('email').innerHTML.split('=')[1],
          document.getElementById('nif').innerHTML.split('=')[1],
          document.getElementById('nCartao').innerHTML.split('=')[1],
          document.getElementById('prazo').innerHTML.split('=')[1],
          document.getElementById('cvv').innerHTML.split('=')[1],
          parseInt(this._router.url.toString().split('/')[7].split('?')[0]));
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

    /*tryput(hotel: Hotel){
      console.log(hotel._id);
      //let date: Date = new Date("2020-05-20");
      //let date2: Date = new Date("2020-05-25");
      hotel.reservations = ["2020-05-20:1", "2020-05-25:1"];
      console.log(hotel.reservations);
      //this._hotelService.updateHotel(hotel).subscribe
      this._hotelService.updateHotel(hotel).subscribe(
        () => {

      });
    }*/
  }
  /*datas: string
    tipoQuarto: string
    nome: String
    morada:  String
    telefone: String
    email: String
    NIF: String
    nCartao: String
    prazo:  String
    cvv:  String
    totalPago: Number*/






}
