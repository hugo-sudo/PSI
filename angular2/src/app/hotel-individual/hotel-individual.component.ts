import { Component, OnInit, OnChanges } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router'

import { Hotel } from '../shared/hotel.model';
import { HotelService } from '../shared/hotel.service';
import { compileComponentFromMetadata } from '@angular/compiler';


@Component({
  selector: 'app-hotel-individual',
  templateUrl: './hotel-individual.component.html',
  styleUrls: ['./hotel-individual.component.css'],
  providers: [HotelService]
})
export class HotelIndividualComponent implements OnInit , OnChanges{
  public showQ1 : boolean = true;
  public showQ2 : boolean = true;
  public showQ3 : boolean = true;
  public showQ4 : boolean = true;



  public precoVisto : boolean = false;
  public verFotosB : boolean = true;
  public href: string = "";
   hotel: Hotel;
  //hotel:Hotel;
  //id;

  constructor(private _activatedroute:ActivatedRoute,
    private _router:Router,
    public _hotelService:HotelService) { }

  //sub;
  ngOnChanges():void{
    console.log("CHANGE");
  }

  ngOnInit(): void {
    /*this.sub=this._Activatedroute.paramMap.subscribe(params => {
      console.log(params);
       this.id = params.get('id');
       let hoteis=this._hotelService.getHotelList();
       this.hotel=hoteis.find(h => h.id==this.id);
   });
  }*/
  //const id = +this._activatedroute.snapshot.params['hot._id'];
  //this.hotel = this._hotelService.getHotel(id);
  this.href = this._router.url;
  this.precoVisto = false;
  document.getElementById("quarto2preco").style.visibility = "hidden";
  console.log("executado init");
  //console.log(this._router.url);
  this._hotelService.getHotel(this._router.url.toString().split("/")[2]).subscribe((res) => {
    this._hotelService.hotel = res as Hotel;
  });
  /*
  var x = document.getElementById("servisos");
  var y = "";
  for(let ser of _hotelService.hotel.services){
    y += ser + '</br>';
  }
  x.innerText = y;*/
  //arranjar maneira de display servicos por linha
  }

  public funcc(){
    //var a = this.href.toString().split("/");
    //console.log(this.href.toString().split("/")[1]);
    //console.log(this._router.url.toString().split("/")[2]);
    //this._hotelService.getHotel(this._router.url.toString().split("/")[2]);
    this._hotelService.getHotel(this._router.url.toString().split("/")[2]).subscribe((res) => {
      this._hotelService.hotel = res as Hotel;
    });


  }

  public filtrar() {
    this.showQ1 = true;
    this.showQ2 = true;
    this.showQ3 = true;
    this.showQ4 = true;
    const preco1B = this._hotelService.hotel.quarto1precoBaixa;
    const preco1A = this._hotelService.hotel.quarto1precoAlta;
    const preco2B = this._hotelService.hotel.quarto2precoBaixa;
    const preco2A = this._hotelService.hotel.quarto2precoAlta;
    const preco3B = this._hotelService.hotel.quarto3precoBaixa;
    const preco3A = this._hotelService.hotel.quarto3precoAlta;
    const preco4B = this._hotelService.hotel.quarto4precoBaixa;
    const preco4A = this._hotelService.hotel.quarto4precoAlta;
    const min = parseFloat((document.getElementById('minp') as HTMLInputElement).value);
    const max = parseFloat((document.getElementById('maxp') as HTMLInputElement).value);
    console.log(preco4B);
    console.log(preco4A);
    console.log(max);
    console.log(min);

    if (!((preco1B > min && preco1B < max) || (preco1A > min && preco1A < max))) {
      this.showQ1 = false;
    }
    if (!((preco2B > min && preco2B < max) || (preco2A > min && preco2A < max))) {
      this.showQ2 = false;
      //document.getElementById("showq2").style.visibility = "hidden";
    }
    if (!((preco3B > min && preco3B < max) || (preco3A > min && preco3A < max))) {
      this.showQ3 = false;
    }
    if (!((preco4B > min && preco4B < max) || (preco4A > min && preco4A < max))) {
      this.showQ4 = false;
    }
  }
  /*public todosQuartos(){

  }*/
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

  nomeImagem(i: string){
    console.log("dentro");

    return  "../../assets/" + i;
  }
  //<li *ngFor="let i of _hotelService.hotel.imagens">
    //<img src=nomeImagem(i) width="500" height="400" alt="hotel">
//</li>
  teste(i: string){
    console.log("testing");
    console.log(i);
    var b = i.split("\n");
    for(let c of b){
      console.log("c:" + c);
      var img = document.createElement('img');
      img.src = c;
      document.getElementById('imgs').appendChild(img);
    }
    this.verFotosB = false;
    return b;
  }

  consolidar(){
    console.log("executado reservar");
    console.log()
  }

  tryput(hotel: Hotel){
    console.log(hotel._id);
    //let date: Date = new Date("2020-05-20");
    //let date2: Date = new Date("2020-05-25");
    //hotel.reservations = ["2020-05-20:1", "2020-05-25:1"];
    //console.log(hotel.reservations);
    //this._hotelService.updateHotel(hotel).subscribe
    this._hotelService.updateHotel(hotel).subscribe(
      () => {
      
    });
  }

  funca(id: string, tipo:string){
    let dateI:Date = new Date((document.getElementById('inicioperiodo') as HTMLInputElement).value);
    var dateF:Date = new Date((document.getElementById('fimperiodo') as HTMLInputElement).value);
    var preco = document.getElementById("quarto" + (parseInt(tipo)+1) + "preco").innerHTML.split(":")[1].replace(" ", "");
    console.log("preco: " + preco);
    console.log("quarto" + (parseInt(tipo)+1) + "preco");

    console.log("QUARTO: " + this._hotelService.hotel.quarto1.toString().split(" ").join(""));
    
    
    this._router.navigate(['/hotel/reservas', id,tipo,dateI.toISOString().slice(0,10) ,dateF.toISOString().slice(0,10), preco.toString() ]);
  }

  

}
