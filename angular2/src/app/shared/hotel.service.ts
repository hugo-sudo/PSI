import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Hotel } from './hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  hoteis: Hotel[];
  hotel:Hotel;
  readonly baseURL = 'http://localhost:3009/hotel';
  readonly otherBase = 'http://localhost:3009/hotel/:id'

  constructor(private http: HttpClient) { }


  getHotelList() {
    return this.http.get(this.baseURL);
  }

  getHotel(_id: string) {
    console.log(_id);
    //console.log(this.hoteis[0].email);
    var a = this.baseURL + '/' + _id;
    console.log(a);
    return this.http.get(a);
  }

  updateHotel(hotel: Hotel){
    var a = this.baseURL + '/' + hotel._id;
    //console.log("reservations: " + hotel.reservations);
    return this.http.put<void>(a, hotel, {
      headers : new HttpHeaders ({
        'Content-Type' : 'application/json'
      })
    });
  }


  //let hotel:Hotel[]=this.getHotelList();
   // return hotel.find(h => h.id==id);
}



