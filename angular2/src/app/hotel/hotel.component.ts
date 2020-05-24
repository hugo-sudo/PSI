import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router'

import { HotelService } from '../shared/hotel.service';
import { Hotel } from '../shared/hotel.model';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css'],
  providers: [HotelService]
})
export class HotelComponent implements OnInit, AfterViewInit {
  //sem hotel
  constructor(public hotelService: HotelService,
            private _router:Router) { }

  ngOnInit(): void {
    this.refreshHotelList();

  }

  ngAfterViewInit(): void {
    //this.randomImage();
  }
  randomImage(): void {
    for(var i = 1; i <= 3; i++) {
      var aleatorio = (Math.floor((Math.random() * 10)) + 1) - 1;
      var path = "../../assets/hotel" + i + aleatorio + ".jpg";
      var img = document.createElement('img');
      img.src = path;
      var nome = document.getElementById('nomeHotel');
      nome.appendChild(img);
    }
  }

  refreshHotelList() {
    this.hotelService.getHotelList().subscribe((res) => {
      this.hotelService.hoteis = res as Hotel[];
    });
  }

  funca(id: string){
    console.log(id);
    this._router.navigate(['/hotel', id]);
  }
  funcRandom(): number{
    var aleatorio = (Math.floor((Math.random() * 10)) + 1) - 1;
    return aleatorio;
  }


//<a [routerLink]="['hotel/', hot.id]" routerLinkActive="active">


}
