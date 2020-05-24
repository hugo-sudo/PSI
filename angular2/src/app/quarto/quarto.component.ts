import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router'

import { Hotel } from '../shared/hotel.model';
import { HotelService } from '../shared/hotel.service';

@Component({
  selector: 'app-quarto',
  templateUrl: './quarto.component.html',
  styleUrls: ['./quarto.component.css'],
  providers: [HotelService]
})
export class QuartoComponent implements OnInit {

  constructor(private _activatedroute:ActivatedRoute,
    private _router:Router,
    public _hotelService:HotelService) { }

  ngOnInit(): void {
    console.log("executado init quarto");
    //console.log(this._router.url);
    this._hotelService.getHotel(this._router.url.toString().split("/")[3]).subscribe((res) => {
      this._hotelService.hotel = res as Hotel;
    });
  }

  funcao() {
    //return this._hotelService.hotel.quarto1;
    //return this._router.url.toString().split("/")[2];
  }

  verificarQuarto(n: number){
    if(this._router.url.toString().split("/")[2] == "quarto" + n){
      return true;
    }
    return false;
  }

  todos(){
    if(this._router.url.toString().split("/")[2] == "todos"){
      return true;
    }
    return false;
  }

}
