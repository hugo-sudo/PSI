import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HoteisAngular';
  router: string;

  constructor(public _router: Router){

          this.router = _router.url; 
    }

    /*public notIndividual(){
      console.log("executado");
    }*/

    public getId(){
      console.log(this._router.url);
      return "/hotel/" + this._router.url.toString().split("/")[2];
    }

    public getIdQuarto(){
      console.log(this._router.url);
      return (this._router.url.toString().split("/")[2] == "quarto1" ||
      this._router.url.toString().split("/")[2] == "quarto2" ||
      this._router.url.toString().split("/")[2] == "quarto3" ||
      this._router.url.toString().split("/")[2] == "quarto4" ||
      this._router.url.toString().split("/")[2] == "todos");
      //return "/hotel/quarto1/" + this._router.url.toString().split("/")[3]
    }

    public verTipo(){
      return (this._router.url.toString().split("/")[2] == "reservas" ||
      this._router.url.toString().split("/")[4] == "1" ||
      this._router.url.toString().split("/")[4] == "2" ||
      this._router.url.toString().split("/")[4] == "3" ) && this._router.url.toString().split("/").length < 11;
    }

    public verEmail(){
      return this._router.url.toString().split("/")[1] == "reservas" 
    }

    public testSize(){
      return this._router.url.toString().split("/").length > 11;
    }
}
