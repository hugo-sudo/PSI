import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../shared/reserva.service';
import { Reserva } from '../shared/reserva.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css'],
  providers: [ReservaService]
})
export class ReservasComponent implements OnInit {
  //public dateToFilter:Date = new Date();
  constructor(public _reservasService : ReservaService,
  public _router:Router) { }

  ngOnInit(): void {
    this._reservasService.getReservaList().subscribe((res) => {
      this._reservasService.reservas = res as Reserva[];
    });
  }
  onlySameNif(nif: string):boolean{
    console.log(nif);
    console.log(this._router.url.split("/")[1].toString());
    return nif == this._router.url.split("/")[1].toString();
  }

  check(s:string):boolean{
    //console.log("s: " + s);
    let dataI:Date = new Date(s.split("&")[0]);
    //console.log("datai: " + dataI);
    let dateToFilterInicio:Date = new Date((document.getElementById('inicio') as HTMLInputElement).value);
    let dateToFilterFim:Date = new Date((document.getElementById('fim') as HTMLInputElement).value);
    //console.log(dateToFilterInicio);
    //console.log(dateToFilterFim);
    //console.log(dateToFilterInicio<dataI);
    //console.log(dateToFilterFim>dataI);
    if(dateToFilterInicio.getMonth()>=0){
      return dateToFilterInicio<=dataI && dataI<=dateToFilterFim;
    }else{
      return true;
    }
  }

  checkValor(n:number){
    var preco = parseFloat((document.getElementById('preco') as HTMLInputElement).value.split("?")[0]);
    console.log(preco);
    if(parseFloat((document.getElementById('preco') as HTMLInputElement).value) >= 0){
      return preco < n;
    }else{
      return true;
    }
  }

  filterValor(){

  }

  filtrarCheckIn(){

  }

}
