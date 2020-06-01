import { Component, OnInit, SystemJsNgModuleLoader , } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { NgForm } from '@angular/forms';

import { ReservaService } from '../shared/reserva.service';
import { HotelService } from '../shared/hotel.service';

import { Hotel } from '../shared/hotel.model';
import { Reserva } from '../shared/reserva.model';
import { ResourceLoader } from '@angular/compiler';


@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
  providers: [ReservaService, HotelService]
})
export class ReservaComponent implements OnInit {
  public confirmado = false;
  public correctedValues = false;
  public precoVisto  = false;
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
      document.getElementById('preco').innerHTML = 'preco: ' + this._router.url.toString().split('/')[7];
      console.log(this._router.url.toString().split('/').length);
      if (this._router.url.toString().split('/').length > 8){
        document.getElementById('nome').innerHTML = this._router.url.toString().split('/')[8].replace("%", " ");
        document.getElementById('morada').innerHTML = this._router.url.toString().split('/')[9].replace("%", " ");
        document.getElementById('telefone').innerHTML = this._router.url.toString().split('/')[10];
        document.getElementById('email').innerHTML = this._router.url.toString().split('/')[11];
        document.getElementById('nif').innerHTML = this._router.url.toString().split('/')[12];
        document.getElementById('nCartao').innerHTML = this._router.url.toString().split('/')[13];
        document.getElementById('prazo').innerHTML = this._router.url.toString().split('/')[14].replace("%2F", "/");
        document.getElementById('cvv').innerHTML = this._router.url.toString().split('/')[15];
      }
  });
    // document.getElementById("gg").innerHTML = this._router.url.toString();
    console.log('URL: ' + this._router.url.toString());
  }
  checkValues(){
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
    const phoneVerifier = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    const nameVerifier = /^[a-zA-Z éÉáàÁÀãÃõÕíÍêÊúÚóÓôÔ']+$/;
    if (nomeUser == '' || nomeUser == null || !nameVerifier.test(nomeUser.toString())) {

      alert ('Nome não é válido!');
      return;
    } else if (nifUser == '' || nifUser == null || !/^[0-9]+$/.test(nifUser.toString()) || nifUser.length < 8 || nifUser.length > 9 ) {

      alert('NIF não é válido!');
      return;
    } else if (emailUser == '' || emailUser == null || !emailVerifier.test(emailUser.toString().toLowerCase()) ) {

      alert('Email não é válido!');
      return;
    } else if (telefoneUser == '' || telefoneUser == null || !phoneVerifier.test(telefoneUser.toString())) {

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
    } else if (validadeUser == '' || validadeUser == null || !this.validateDate(validateString.substring(0, 2), validateString.substring(3, 7)) || !dateVerifier.test(validadeUser.toString()) ){

      alert ('Data de validade do cartão de crédito não é válida');
      return;
    }

    this._router.navigate(['/hotel/reservas', this._router.url.toString().split('/')[3],this._router.url.toString().split('/')[4],this._router.url.toString().split('/')[5] ,this._router.url.toString().split('/')[6], this._router.url.toString().split('/')[7],
    (document.getElementById('nomeInput') as HTMLInputElement).value, (document.getElementById('moradaInput') as HTMLInputElement).value, (document.getElementById('telefoneInput') as HTMLInputElement).value,
    (document.getElementById('emailInput') as HTMLInputElement).value, (document.getElementById('nifInput') as HTMLInputElement).value,
    (document.getElementById('nCartaoInput') as HTMLInputElement).value,(document.getElementById('validadeInput') as HTMLInputElement).value, (document.getElementById('cvvInput') as HTMLInputElement).value]);

  }

validateDate(month: string , year: string) {
  const date = new Date();
  const todayMonth = date.getMonth() + 1;
  const todayYear = date.getFullYear();
  // tslint:disable-next-line: radix
  if (month.substring(0, 1) == '0') {
    const mesCorreto = month.substring(1,2);
    if (parseInt(year) > todayYear) {
      return true;
    } else if (parseInt(year) == todayYear && parseInt(mesCorreto) >= todayMonth) {
      return true;
    } else {
      return false;
    }
  }
  if (+month > 12) {
    return false;
  }
  if (parseInt(year) > todayYear) {
    return true;
  } else if (parseInt(year) == todayYear && parseInt(month) >= todayMonth) {
    return true;
  } else {
    return false;
  }
}
cancelar(){
    this._location.back();
  }

confirmar(hotel: Hotel){

    this.confirmado = true;
  }
  funca(id: string, tipo:string){
    let dateI:Date = new Date((document.getElementById('inicioperiodo') as HTMLInputElement).value);
    var dateF:Date = new Date((document.getElementById('fimperiodo') as HTMLInputElement).value);
    var preco = document.getElementById("quarto" + (parseInt(tipo)+1) + "preco").innerHTML.split(":")[1].replace(" ", "");
    console.log("preco: " + preco);
    console.log("quarto" + (parseInt(tipo)+1) + "preco");

    console.log("QUARTO: " + this._hotelService.hotel.quarto1.toString().split(" ").join(""));


    this._router.navigate(['/hotel/reservas', id,tipo,dateI.toISOString().slice(0,10) ,dateF.toISOString().slice(0,10), preco.toString() ]);
    location.reload();
  }
  filtrarData(){
    this.showQ1 = true;
    this.showQ2 = true;
    //document.getElementById("showq2").style.visibility = "show";
    this.showQ3 = true;
    this.showQ4 = true;
    console.log("filtrardata");
    if(this.contemData(this._hotelService.hotel.reservationsQuarto1, this._hotelService.hotel.nDispReservationsQuarto1)){
      this.showQ1 = false;
      document.getElementById("quarto1preco").style.visibility = "hidden";
    }else{
      document.getElementById("quarto1preco").style.visibility = "visible";
      this.mostrarPreco("quarto1");
    }
    if(this.contemData(this._hotelService.hotel.reservationsQuarto2, this._hotelService.hotel.nDispReservationsQuarto2)){
      this.showQ2 = false;
      document.getElementById("quarto2preco").style.visibility = "hidden";
    }else{
      document.getElementById("quarto2preco").style.visibility = "visible";
      this.mostrarPreco("quarto2");
    }
    if(this.contemData(this._hotelService.hotel.reservationsQuarto3, this._hotelService.hotel.nDispReservationsQuarto3)){
      this.showQ3 = false;
      document.getElementById("quarto3preco").style.visibility = "hidden";
    }else{
      document.getElementById("quarto3preco").style.visibility = "visible";
      this.mostrarPreco("quarto3");
    }
    this.precoVisto = true;

    if(this._hotelService.hotel.quarto4servicos.length > 0){
      if(this.contemData(this._hotelService.hotel.reservationsQuarto4, this._hotelService.hotel.nDispReservationsQuarto4)){
        this.showQ4 = false;
        document.getElementById("quarto4preco").style.visibility = "hidden";
      }else{
        document.getElementById("quarto4preco").style.visibility = "visible";
        this.mostrarPreco("quarto4");
      }
    }

  }
  contemData(dias: Array<string>, n: number) : boolean{
    let dateI:Date = new Date((document.getElementById('inicioperiodo') as HTMLInputElement).value);
    console.log(dateI);
    var dateF:Date = new Date((document.getElementById('fimperiodo') as HTMLInputElement).value);
    console.log(dateF);
    console.log(dias[0]);
    console.log(n);

    while(dateI <= dateF){
      console.log(dateI.toISOString().slice(0,10));
      console.log("index: " + dias.indexOf(dateI.toISOString().slice(0,10) + ":" + n));
      var index = dias.indexOf(dateI.toISOString().slice(0,10) + ":" + n)
      if(index != -1){
        return true;
      }
      dateI.setDate(dateI.getDate() + 1);
    }
    return false;
  }

  mostrarPreco(quarto: string):void{
    let dateI:Date = new Date((document.getElementById('inicioperiodo') as HTMLInputElement).value);
    var dateF:Date = new Date((document.getElementById('fimperiodo') as HTMLInputElement).value);
    console.log(dateI);
    console.log("quarto:" + quarto)
    var precoB:number = 0;
    var precoA:number = 0;
    var currentprice = 0;
    let idpreco:string = "";
    switch(quarto){
      case "quarto1":
        idpreco = 'quarto1preco'
        precoB = this._hotelService.hotel.quarto1precoBaixa
        precoA = this._hotelService.hotel.quarto1precoAlta
        break;
      case "quarto2":
        idpreco = 'quarto2preco'
        precoB = this._hotelService.hotel.quarto2precoBaixa
        precoA = this._hotelService.hotel.quarto2precoAlta
        break;
      case "quarto3":
        idpreco = 'quarto3preco'
        precoB = this._hotelService.hotel.quarto3precoBaixa
        precoA = this._hotelService.hotel.quarto3precoAlta
        break;
      case "quarto4":
        idpreco = 'quarto4preco'
        precoB = this._hotelService.hotel.quarto4precoBaixa
        precoA = this._hotelService.hotel.quarto4precoAlta
        break;
    }
    while(dateI <= dateF){
      if(this.pertenceEpocaBaixa(dateI)){
        console.log("pertenceDeuTrue");
        currentprice += precoB
      }else{
        console.log("pertenceDeuFalse");
        currentprice += precoA
      }
      dateI.setDate(dateI.getDate() + 1);
    }
    console.log(idpreco);
    //document.getElementById(idpreco).style.display = "block";
    if(idpreco.length > 0){
      document.getElementById(idpreco).innerHTML = "preco: " + currentprice;
    }
  }

  pertenceEpocaBaixa(date: Date): boolean{
    let dia:number = date.getUTCDate()
    let mes:number = date.getUTCMonth() + 1;
    let mesdia: number = mes*100 + dia;
    console.log("dia: " + dia);
    console.log("mes: " + mes);
    console.log(mesdia);
    return ((mesdia >= 115 && mesdia <= 531) || (mesdia >= 930 && mesdia <= 1215))
    //               15/01          31/05             30/09           15/12

  }
  /*newConfirmar(){
    this._router.navigate(['/hotel/reservas', ]);
    this._router.navigate(['/hotel/reservas', id,tipo,dateI.toISOString().slice(0,10) ,dateF.toISOString().slice(0,10), preco.toString() ]);

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
